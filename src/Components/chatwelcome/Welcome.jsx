import React from 'react'

const Welcome = () => {
    return (
        <div className="chat">
            <div className="chat-header clearfix">
                <div className="row">
                    <div className="col-lg-6">
                        <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                            <img src="https://t4.ftcdn.net/jpg/04/17/26/55/360_F_417265589_3icF8VsU9yT6mTWTAeFkGry8JKQdztxt.jpg" alt="avatar" />
                        </a>
                        <div className="chat-about">
                            <h6 className="m-b-0"> </h6>
                            <small></small>
                        </div>
                    </div>
                    <div className="col-lg-6 hidden-sm text-righttext-decoration-underline text-danger mt-2 ">
                    <b>  Welcome to Urgent Chat </b>
                    </div>
                
                </div>
            </div>
            <div className="chat-history">
                <ul className="m-b-0">
                    <li className="clearfix">
                        <div className="message-data text-right">
                            <span className="message-data-time">10:10 AM, Today</span>
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                        </div>
                        <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                    </li>
                    <li className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">10:12 AM, Today</span>
                        </div>
                        <div className="message my-message">Are we meeting today?</div>
                    </li>
                    <li className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">10:15 AM, Today</span>
                        </div>
                        <div className="message my-message">Project has been already finished and I have results to show you.</div>
                    </li>
                </ul>
            </div>
            <div className="chat-message clearfix text-danger d-flex align-items-center justify-content-center">
              Texting Helps
            </div>
        </div>
    )
}

export default Welcome