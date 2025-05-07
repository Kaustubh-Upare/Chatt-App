import {
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import {
  AttachFile as AttachIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import AppLayout from "../components/layout/AppLayout";
import { InputBox } from "../components/styled/StyleComponents";
import MessageComponent from "../components/shared/MessageComponent";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSocket } from "../Socket";
import {
  Chat_Joined,
  Chat_Leaved,
  NEW_MSG,
  Start_Typing,
  Stop_Typing,
} from "../components/constants/socketevents";
import {
  useGetChatDetailsQuery,
  useGetOldMsgsQuery,
} from "../redux/api/api";
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
  const typingTimeout = useRef(null);

  const [page, setPage] = useState(1);
  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [infData, setInfData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [iAmTyping, setIAmTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const dispatch = useDispatch();
  const socket = getSocket();

  const { user } = useSelector((state) => state.auth);
  const { isFileMenu } = useSelector((state) => state.misc);

  const { data: oldMsgsChunck, isLoading } = useGetOldMsgsQuery({ chatId, page });
  const chatDetails = useGetChatDetailsQuery({ chatId });

  const members = chatDetails?.data?.chatu?.members;

  // Join/Leave socket room
  useEffect(() => {
    if (!user || !members) return;
    socket.emit(Chat_Joined, { userId: user._id, members });
    dispatch(removeNewMsgAlert({ chatId }));

    return () => {
      setPage(1);
      setInfData([]);
      setMessages([]);
      socket.emit(Chat_Leaved, { userId: user._id, members });
    };
  }, [chatId, user, members]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (bottomRef.current && containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Load old messages
  useEffect(() => {
    if (!isLoading && oldMsgsChunck?.msg && page <= oldMsgsChunck.totalPages) {
      setTotalPages(oldMsgsChunck.totalPages);
      setInfData((prev) => [...prev, ...oldMsgsChunck.msg]);
    }
  }, [oldMsgsChunck, isLoading, page]);

  // Message input handler with typing events
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

  // Send message
  const submitHandler = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    socket.emit(NEW_MSG, { chatId, members, message: inputMsg });
    setInputMsg("");
  };

  // Handle new message
  const newMsgHandler = useCallback(
    (data) => {
      if (data.chatId === chatId) {
        setMessages((prev) => [data.message, ...prev]);
      }
    },
    [chatId]
  );

  // Typing event listeners
  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId === chatId) setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId === chatId) setUserTyping(false);
    },
    [chatId]
  );

  useSocketEvents(socket, {
    [NEW_MSG]: newMsgHandler,
    [Start_Typing]: startTypingListener,
    [Stop_Typing]: stopTypingListener,
  });

  const allMessages = [...messages, ...infData];

  const fileMenuHandler = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  return chatDetails.isLoading ? (
    <CubeLoader />
  ) : (
    <>
      <Stack
        ref={containerRef}
        bgcolor="#1D1E24"
        height="90%"
        sx={{
          padding: "0.5rem",
          flexDirection: "column-reverse",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {allMessages.map((msg, index) => (
          <MessageComponent
            key={`msg-${index}`}
            message={msg}
            user={user}
            reff={index === allMessages.length - 2 ? lastMessageRef : null}
            totalPages={totalPages}
            setPage={setPage}
            index={index}
            page={page}
          />
        ))}
        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>

      <form onSubmit={submitHandler} style={{ height: "10%" }}>
        <Stack
          direction="row"
          alignItems="center"
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
  );
};

// export default AppLayout()(Chats);
