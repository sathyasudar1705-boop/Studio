import React from 'react';
import SendIcon from '@mui/icons-material/Send';

const Messages = () => {
    return (
        <div className="ub-messages-view fadeIn">
            <h2 className="ub-section-title">Communications</h2>
            
            <div className="ub-chat-container">
                <div className="ub-chat-sidebar">
                    <div className="ub-chat-contact active">
                        <img src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg" alt="Evelyn" className="ub-chat-avatar" />
                        <div className="ub-contact-info">
                            <h4>Evelyn Harper</h4>
                            <p>Hi, your gallery is ready!</p>
                        </div>
                    </div>
                    <div className="ub-chat-contact">
                        <img src="https://images.pexels.com/photos/1580274/pexels-photo-1580274.jpeg" alt="Julian" className="ub-chat-avatar" />
                        <div className="ub-contact-info">
                            <h4>Julian Cross</h4>
                            <p>Looking forward to the shoot.</p>
                        </div>
                    </div>
                </div>

                <div className="ub-chat-area">
                    <div className="ub-chat-header">
                        <img src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg" alt="Evelyn" className="ub-chat-avatar" />
                        <h3>Evelyn Harper</h3>
                    </div>

                    <div className="ub-chat-messages">
                        <div className="ub-message-bubble incoming">
                            Hello! I just finished uploading your selection gallery.
                            <span className="ub-msg-time">10:45 AM</span>
                        </div>
                        <div className="ub-message-bubble outgoing">
                            That's wonderful! I'll take a look right now.
                            <span className="ub-msg-time">11:02 AM</span>
                        </div>
                        <div className="ub-message-bubble incoming">
                            Take your time to select your favorite 30 images for the final retouches.
                            <span className="ub-msg-time">11:05 AM</span>
                        </div>
                    </div>

                    <div className="ub-chat-input-area">
                        <input type="text" placeholder="Type a message..." className="ub-chat-input" />
                        <button className="ub-btn-send"><SendIcon fontSize="small" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
