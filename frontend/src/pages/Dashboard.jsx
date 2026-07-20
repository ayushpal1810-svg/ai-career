import React from 'react'
import { useState } from 'react'

const Dashboard = () => {
    const [education, seteducation] = useState("")
    const [college, setcollege] = useState("")
    const [graduationyear, setgraduationyear] = useState(new Date().getFullYear())
    const [targetrole, settargetrole] = useState("")
    const [githuburl, setgithuburl] = useState("")
    const [linkedinurl, setlinkedinurl] = useState("")
    const [skills, setskills] = useState([])
    const [projects, setProjects] = useState([]);

    const [currentProject, setCurrentProject] = useState({
        title: "",
        description: "",
        techstack: "",
    });
    return (
        <div>
            <h2>Education/Degree</h2>
            <input type="text" placeholder='education' value={education} onChange={(e) => seteducation(e.target.value)} />
            <h2>College</h2>
            <input
                type="text"
                placeholder="College"
                value={college}
                onChange={(e) => setcollege(e.target.value)}
            />

            <h2>Graduation Year</h2>
            <input
                type="number"
                placeholder="Graduation Year"
                value={graduationyear}
                onChange={(e) => setgraduationyear(e.target.value)}
            />

            <h2>Target Role</h2>
            <input
                type="text"
                placeholder="Target Role"
                value={targetrole}
                onChange={(e) => settargetrole(e.target.value)}
            />

            <h2>GitHub URL</h2>
            <input
                type="text"
                placeholder="GitHub URL"
                value={githuburl}
                onChange={(e) => setgithuburl(e.target.value)}
            />

            <h2>LinkedIn URL</h2>
            <input
                type="text"
                placeholder="LinkedIn URL"
                value={linkedinurl}
                onChange={(e) => setlinkedinurl(e.target.value)}
            />
            <h2>skills</h2>
            <input type="text" />



        </div>
        
    )
}

export default Dashboard
