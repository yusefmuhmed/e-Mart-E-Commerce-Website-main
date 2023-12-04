"use client";

export default function Preloader() {
    return (
        <>
            <div className="preloader-area">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preloader Style */}
            <style jsx>{`
                .preloader-area {
                    position: fixed;
                    top: 0;
                    background-color: rgba(255, 255, 255, .97);
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 99999;
                    text-align: center;
                }
                .spinner-grow {
                    background-color: var(--mainColor);
                    width: 50px;
                    height: 50px;
                }
            `}</style>
        </>
    )
};
