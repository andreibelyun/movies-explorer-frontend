import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project">
            <h2 className="about-project__title">О проекте</h2>

            <div className="about-project__description">

                <div className="about-project__paragraph">
                    <h3 className="about-project__paragraph-title">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about-project__paragraph-text">
                        Составление плана, работу над бэкендом, вёрстку,
                        добавление функциональности и финальные доработки.
                    </p>
                </div>

                <div className="about-project__paragraph">
                    <h3 className="about-project__paragraph-title">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about-project__paragraph-text">
                        У каждого этапа был мягкий и жёсткий дедлайн,
                        которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>

            <div className="about-project__timeline">
                <div className="about-project__timeline-backend">
                    <p className="about-project__timeline-time">1 неделя</p>
                    <p className="about-project__timeline-text">Back-end</p>
                </div>
                <div className="about-project__timeline-frontend">
                    <p className="about-project__timeline-time">4 недели</p>
                    <p className="about-project__timeline-text">Front-end</p>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;