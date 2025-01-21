import {Helmet} from "react-helmet-async"

const Title=({title="Chatt",description="This is Chat Application"})=>{

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    )
}

export default Title;