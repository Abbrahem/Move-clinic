import React, { useEffect } from 'react';

const Videos = () => {
    const videos = [
        {
            src: "/img/vr1.mp4",
            title: "لتعريف Move بيقدملك اي؟"
        },
        {
            src: "/img/vr2.mp4",
            title: "ما هي حاله ال فيبروميالجيا؟"
        },
        {
            src: "/img/vr3.mp4",
            title: "إراء عميل عندنا من 2023"
        }
    ];

    useEffect(() => {
        const videoCards = document.querySelectorAll('.video-card');
        const videos = document.querySelectorAll('video');
        const playButtons = document.querySelectorAll('.play-button');
        
        // Video hover effects
        videoCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            });
        });
        
        // Play button functionality
        playButtons.forEach((playButton, index) => {
            playButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const video = videos[index];
                const wrapper = this.parentElement;
                
                // Pause all other videos
                videos.forEach((otherVideo, otherIndex) => {
                    if (otherIndex !== index && !otherVideo.paused) {
                        otherVideo.pause();
                        otherVideo.currentTime = 0;
                        playButtons[otherIndex].parentElement.classList.remove('playing');
                    }
                });
                
                // Play current video
                if (video.paused) {
                    video.play();
                    wrapper.classList.add('playing');
                }
            });
        });
        
        // Video event listeners
        videos.forEach((video, index) => {
            const wrapper = video.parentElement;
            
            video.addEventListener('play', function() {
                wrapper.classList.add('playing');
            });
            
            video.addEventListener('pause', function() {
                wrapper.classList.remove('playing');
            });
            
            video.addEventListener('ended', function() {
                wrapper.classList.remove('playing');
                this.currentTime = 0;
            });
            
            // Click on video to play/pause
            video.addEventListener('click', function() {
                if (this.paused) {
                    videos.forEach((otherVideo, otherIndex) => {
                        if (otherIndex !== index && !otherVideo.paused) {
                            otherVideo.pause();
                            otherVideo.currentTime = 0;
                            playButtons[otherIndex].parentElement.classList.remove('playing');
                        }
                    });
                    this.play();
                } else {
                    this.pause();
                }
            });
        });
    }, []);

    return (
        <section id="videos" className="videos">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">فيديوهات تعليمية</h2>
                <div className="videos-grid">
                    {videos.map((video, index) => (
                        <div key={index} className="video-card" data-aos="fade-up" data-aos-delay={`${(index + 1) * 100}`}>
                            <div className="video-wrapper">
                                <video controls preload="metadata">
                                    <source src={video.src} type="video/mp4" />
                                    متصفحك لا يدعم تشغيل الفيديو
                                </video>
                                <div className="play-button">
                                    <i className="fas fa-play"></i>
                                </div>
                            </div>
                            <h3 className="video-title">{video.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Videos;
