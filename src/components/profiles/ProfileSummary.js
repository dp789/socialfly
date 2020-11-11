import React from 'react';
import { Link } from 'react-router-dom';

const ProfileSummary = (props) => {
    const { user } = props;
    const formatTitle = (title, limit = 250) => {
        const newTitle = [];
        if (title.length > 250) {
            title.split(' ').reduce((acc, cur) => {
                if (acc + cur.length <= limit) {
                    newTitle.push(cur);
                }
                return acc + cur.length;
            }, 0)
    
            return `${newTitle.join(' ')} ...`;
        }
    
        return title;
    }
    const formatProfileContent = formatTitle(user.aboutMe);
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-start align-items-center my-1">
                    <div className="profile-img-holder">
                        <img src={user.avatar} />
                    </div>
                    <div className="d-flex flex-column ml-3">
                        <h6>{user.role}</h6>
                        <h6>{user.techStack}</h6>
                    </div>
                </div>
                <h4>{user.firstName} {user.lastName}</h4>
                <hr />
                <h5>About Me</h5>
                <p className="card-text">{formatProfileContent}</p>
                <Link to={'/profile/' + user.id}>
                    <p><em>View Profile</em></p>
                </Link>
            </div>
        </div>
    )
}

export default ProfileSummary;
