import { Box, IconButton, Input, Skeleton, Stack, TextField, Typography } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";
import { AttachFile as AttachIcon, Send as SendIcon } from "@mui/icons-material";
import { InputBox } from "../components/styled/StyleComponents";
import MessageComponent from "../components/shared/MessageComponent";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "../Socket";
import { Chat_Joined, Chat_Leaved, NEW_MSG, Start_Typing, Stop_Typing } from "../components/constants/socketevents";
import { useGetChatDetailsQuery, useGetOldMsgsQuery } from "../redux/api/api";
import { useSocketEvents } from "../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import FileMenuAnchor from "../components/dialog/FileMenuAnchor";
import { removeNewMsgAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/layout/Loaders";
import CubeLoader from "../components/layout/CubeLoader";

const Chats = ({ chatId }) => {
    const containerRef = useRef(null);
    const bottomRef = useRef(null);
    const lastMessageRef = useRef(null);

    const [page, setPage] = useState(1);
    const [initialFetchDone, setInitialFetchDone] = useState(false); // New state for initial fetch
    const { data: oldMsgsChunck, isLoading, isFetching } = useGetOldMsgsQuery({ chatId, page });
    const chatDetails = useGetChatDetailsQuery({ chatId });

    const { user } = useSelector((state) => state.auth);
    const { isFileMenu } = useSelector((state) => state.misc);
    const dispatch = useDispatch();

    const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
    const [inputMsg, setInputMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const [iAmTyping, setIAmTyping] = useState(false);
    const [userTyping, setUserTyping] = useState(false);
    const typingTimeout = useRef(null);

    const [infData, setInfData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [bcMessage, setBcMessage] = useState([]);

    const socket = getSocket();
    const members = chatDetails?.data?.chatu?.members;

    useEffect(() => {
        socket.emit(Chat_Joined, { userId: user._id, members });
        dispatch(removeNewMsgAlert({ chatId }));
        return () => {
            setPage(1);
            setInfData([]);
            setMessages([]);
            setInitialFetchDone(false); // Reset initial fetch state on unmount
            socket.emit(Chat_Leaved, { userId: user._id, members });
        };
    }, [chatId, user, members]);

    useEffect(() => {
        if (bottomRef.current && containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    useEffect(() => {
        if (!isLoading && oldMsgsChunck?.msg && page <= oldMsgsChunck.totalPages) {
            setTotalPages(oldMsgsChunck.totalPages);
            setBcMessage((p) => [...oldMsgsChunck.msg]);
            setInfData((prev) => [...prev, ...oldMsgsChunck.msg]);
            setInitialFetchDone(true); // Mark initial fetch as done
        }
    }, [page, oldMsgsChunck, isLoading]);

    const msgOnChangeHandler = (e) => {
        setInputMsg(e.target.value);
        if (!iAmTyping) {
            socket.emit(Start_Typing, { members, chatId });
            setIAmTyping(true);
        }
        if (typingTimeout.current) clearTimeout(typingTimeout.current);

        typingTimeout.current = setTimeout(() => {
            socket.emit(Stop_Typing, { members, chatId });
            setIAmTyping(false);
        }, 1500);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!inputMsg.trim()) return;
        socket.emit(NEW_MSG, { chatId, members, message: inputMsg });
        setInputMsg("");
    };

    const newMsgHandler = useCallback(
        (data) => {
            if (data.chatId !== chatId) return;
            setMessages((prev) => [data.message, ...prev]);
        },
        [chatId]
    );

    const startTypingListener = useCallback(
        (data) => {
            if (data.chatId !== chatId) return;
            setUserTyping(true);
        },
        [chatId]
    );

    const stopTypingListener = useCallback(
        (data) => {
            if (data.chatId !== chatId) return;
            setUserTyping(false);
        },
        [chatId]
    );

    const eventArr = {
        [NEW_MSG]: newMsgHandler,
        [Start_Typing]: startTypingListener,
        [Stop_Typing]: stopTypingListener,
    };
    useSocketEvents(socket, eventArr);

    const allMsgs = useMemo(() => [...messages, ...infData], [messages, infData]);

    const fileMenuHandler = (e) => {
        dispatch(setIsFileMenu(true));
        setFileMenuAnchor(e.currentTarget);
    };

    return (
        // Only show loader during initial load or when isFetching and initial fetch is not done
        (isLoading || (!initialFetchDone && isFetching) || chatDetails.isLoading) ? (
            <CubeLoader />
        ) : (
            <>
                <Stack
                    ref={containerRef}
                    bgcolor={"#1D1E24"}
                    height={"90%"}
                    sx={{
                        padding: "0.5rem",
                        flexDirection: "column-reverse",
                        overflowY: "auto",
                        overflowX: "hidden",
                    }}
                >
                    {allMsgs.map((i, index) => (
                        <MessageComponent
                            key={`infData-${index}`}
                            message={i}
                            user={user._id}
                            reff={index === allMsgs.length - 4 ? lastMessageRef : null}
                            totalPages={totalPages}
                            setPage={setPage}
                            index={index}
                            page={page}
                        />
                    ))}
                    {userTyping && <TypingLoader />}
                    <div className="madad" ref={bottomRef} />
                </Stack>
                <form onSubmit={submitHandler} style={{ height: "10%" }}>
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        height={"100%"}
                        sx={{ backgroundColor: "#303030", height: "100%" }}
                    >
                        <IconButton onClick={fileMenuHandler} sx={{ color: "red" }}>
                            <AttachIcon />
                        </IconButton>
                        {isFileMenu && <FileMenuAnchor anchorEl={fileMenuAnchor} chatId={chatId} />}
                        <InputBox
                            placeholder="Type Messages Here...."
                            value={inputMsg}
                            onChange={msgOnChangeHandler}
                        />
                        <IconButton type="submit">
                            <SendIcon sx={{ color: "red" }} />
                        </IconButton>
                    </Stack>
                </form>
            </>
        )
    );
};

export default AppLayout()(Chats);