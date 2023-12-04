import React from 'react'
import TeamHeads from '../cms/types/teamheads';
import Button from '../../components/core/button';
import Image from '../../components/core/image';

interface Props {
    team?: TeamHeads
}

export default function TeamMembers({ team }: Props) {
    return (
        <>
            <div className="team-area pt-100 pb-70 bg-fafafa">
                <div className="container">
                    <div className="section-title">
                        <span className="sub-title">
                            {team?.subTitle}
                        </span>
                        <h2>
                            {team?.subTitle}
                        </h2>
                        <p>
                            {team?.paragraph}
                        </p>
                    </div>

                    <div className="row justify-content-center">
                        {team?.heads?.map((member) => (
                            <div className="col-lg-3 col-md-6 col-sm-6" key={member.id}>
                                <div className="single-team-member">
                                    <Image src={member.photo} alt="" />
                                    <div className="content">
                                        <h3>
                                            {member.name}
                                        </h3>
                                        <span>
                                            {member.jobTitle}
                                        </span>
                                        <ul className="social-links">
                                            <li>
                                                <Button btn={member.socialLinks?.twitter} noStyle targetBrank />
                                            </li>
                                            <li>
                                                <Button btn={member.socialLinks?.facebook} noStyle targetBrank />
                                            </li>
                                            <li>
                                                <Button btn={member.socialLinks?.linkedin} noStyle targetBrank />
                                            </li>
                                            <li>
                                                <Button btn={member.socialLinks?.whatsapp} noStyle targetBrank />
                                            </li>
                                            <li>
                                                <Button btn={member.socialLinks?.instagram} noStyle targetBrank />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
