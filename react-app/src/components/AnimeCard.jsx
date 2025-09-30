import React from 'react'

const AnimeCard = ({ anime: { title, mean, main_picture, start_date }
}) => {
    return (
        <div className="anime-card">
            <img src={main_picture ?.medium || 'https://via.placeholder.com/200x280'}
            alt={title}
            />
            <div className={"mt-4"}>
                <h3>{title}</h3>

                <div className="content">
                    <div className="rating">
                        <img src={"star.svg"} alt="star" />
                        <p>{mean || "N/A"}</p>
                    </div>

                    <span>•</span>
                    <p className="year">
                        {start_date ? new Date(start_date).getFullYear() : "Unknown"}
                    </p>

                </div>

            </div>

        </div>

    )
}
export default AnimeCard
