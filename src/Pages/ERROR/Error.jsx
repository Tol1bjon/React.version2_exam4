import React from 'react';
import { useTranslation } from 'react-i18next';
import bg from '../../assets/1059 2.jpg';
import car from '../../assets/rio_new 2.png';
import { Link } from 'react-router-dom';

const Error = () => {
    const { t } = useTranslation();

    return (
        <main className="error-page" style={{ backgroundImage: `url("${bg}")` }}>
            <div className="error-page__shade" />

            <nav className="error-page__nav" aria-label={t('error.navCatalog')}>
                <Link to="/">{t('error.navCatalog')}</Link>
                <Link to="/trade-in">{t('error.navTradeIn')}</Link>
                <Link to="/credit">{t('error.navCredit')}</Link>
                <Link to="/contacts">{t('error.navContacts')}</Link>
            </nav>

            <section className="error-page__content" aria-labelledby="error-title">
                <div className="error-page__code" aria-hidden="true">
                    <span>404</span>
                    <img src={car} alt="" />
                </div>

                <h1 id="error-title">{t('error.title')}</h1>
                <p className="error-page__message">
                    {t('error.message')}
                </p>
                <Link className="error-page__home" to="/">{t('error.home')}</Link>
            </section>

            <style>{`
                .error-page {
                    position: relative;
                    isolation: isolate;
                    display: flex;
                    min-height: 100vh;
                    min-height: 100vh;
                    flex-direction: column;
                    align-items: center;
                    overflow: hidden;
                    color: #fff;
                    background-color: #222;
                    background-position: center;
                    background-size: cover;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .error-page__shade {
                    position: absolute;
                    z-index: -1;
                    inset: 0;
                    background:
                        radial-gradient(ellipse at 50% 44%, rgba(190, 0, 0, .63) 0%, rgba(137, 0, 0, .54) 38%, rgba(24, 24, 24, .9) 100%),
                        linear-gradient(180deg, rgba(20, 20, 20, .45), rgba(20, 20, 20, .55));
                }

                .error-page__nav {
                    z-index: 1;
                    display: flex;
                    justify-content: center;
                    gap: 22px;
                    width: 100%;
                    padding: 56px 16px 0;
                    text-align: center;
                }

                .error-page__nav a {
                    color: #fff;
                    font-size: 9px;
                    font-weight: 700;
                    line-height: 1;
                    text-decoration: none;
                    text-transform: uppercase;
                    white-space: nowrap;
                }

                .error-page__content {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 0 20px;
                    text-align: center;
                }

                .error-page__code {
                    position: relative;
                    display: grid;
                    place-items: center;
                    height: 250px;
                    color: #fff;
                    font-size: 300px;
                    font-weight: 800;
                    line-height: .82;
                }

                .error-page__code span {
                    position: relative;
                    z-index: 0;
                    display: block;
                }

                .error-page__code img {
                    position: absolute;
                    top: 58%;
                    left: 57%;
                    width: 135px;
                    max-width: none;
                    z-index: 1;
                    transform: translate(-50%, -50%);
                }

                .error-page__content h1 {
                    margin: 3px 0 0;
                    font-size: 30px;
                    font-weight: 400;
                    line-height: 1.25;
                    margin-top: 50px;
                }

                .error-page__message {
                    max-width: 450px;
                    margin: 8px 0 0;
                    color: rgba(255, 255, 255, .38);
                    font-size: 10px;
                    line-height: 1.2;
                }

                .error-page__home {
                    display: grid;
                    width: 128px;
                    height: 32px;
                    place-items: center;
                    margin-top: 25px;
                    border-radius: 3px;
                    background: #e00000;
                    color: #fff;
                    font-size: 9px;
                    font-weight: 700;
                    text-decoration: none;
                    text-transform: uppercase;
                    transition: background-color .18s ease;
                }

                .error-page__home:hover {
                    background: #bd0000;
                }

                @media (max-width: 600px) {
                    .error-page {
                        min-height: 100vh;
                        min-height: 100svh;
                    }

                    .error-page__nav {
                        gap: 8px;
                        padding: 8px 7px 0;
                    }

                    .error-page__nav a {
                        font-size: 10px;
                    }

                    .error-page__content {
                        position: absolute;
                        inset: 0;
                        flex: initial;
                        justify-content: center;
                        padding: 38px 12px 12px;
                    }

                    .error-page__code {
                        height: clamp(108px, 35vw, 150px);
                        font-size: clamp(112px, 38vw, 160px);
                    }

                    .error-page__code img {
                        width: clamp(72px, 22vw, 92px);
                        position: absolute;
                        top: 60%;
                        left: 61%;
                    }

                    .error-page__content h1 {
                        margin-top: 10px;
                        font-size: 19px;
                    }

                    .error-page__message {
                        max-width: 340px;
                        margin-top: 10px;
                        font-size: 10px;
                        line-height: 1.2;
                    }

                    .error-page__desktop-break {
                        display: none;
                    }

                    .error-page__home {
                        width: min(180px, calc(100vw - 24px));
                        height: 40px;
                        margin-top: 24px;
                        font-size: 10px;
                    }
                }
            `}</style>
        </main>
    );
}

export default Error;
