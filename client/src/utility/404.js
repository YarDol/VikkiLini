import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";

const page404Styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
    textAlign: "center",
  };

const Page404 = () => {
    const {t} = useTranslation();

    return (
        <div style={page404Styles}>
            <p>{t('page404p')}</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/">{t('btm')}</Link>
        </div>
    )
}

export default Page404;