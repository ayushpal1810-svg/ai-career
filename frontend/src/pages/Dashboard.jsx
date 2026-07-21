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
    const [skillstring, setskillstring] = useState("")
    const [projects, setProjects] = useState([]);
    const [isprofileexist, setisprofileexist] = useState(true)

    const [currentProject, setCurrentProject] = useState({
        title: "",
        description: "",
        techstack: "",
    });
    const fetchprofile=()=>{

    }
    const addproject = () => {
        if (
            !currentProject.title ||
            !currentProject.description ||
            !currentProject.techstack
        ) {
            alert("Please fill all project fields.");
            return;
        }
        const project = {
            ...currentProject,
            techstack: currentProject.techstack.split(",").map((tech) => tech.trim()),
        }
        setProjects([...projects, project]);
        setCurrentProject({
            title: "",
            description: "",
            techstack: "",
        });

    }
    const deleteProject = (index) => {
        const updatedProjects = projects.filter((project, i) => {
            if (i !== index) {
                return true;
            } else {
                return false;
            }
        });

        setProjects(updatedProjects);
    };
    const saveprofile = ()=>{

    }
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
            <input
                type="text"
                placeholder='skills'
                value={skillstring}
                onChange={(e) => setskillstring(e.target.value)} />
            <h2>projects</h2>
            <input
                type="text"
                placeholder='title' value={currentProject.title}
                onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })} />
            <input type="text"
                placeholder='description' value={currentProject.description}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })} />
            <input type="text"
                placeholder='techstack' value={currentProject.techstack}
                onChange={(e) => setCurrentProject({ ...currentProject, techstack: e.target.value })} />
            <button onClick={addproject}>add project</button>
            <div>
                {projects.map((project, index) => (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }} key={index}>
                        <h3>{project.title}</h3>
                        <button onClick={() => deleteProject(index)}>X</button>
                    </div>
                ))} </div>

            <button onClick={()=>saveprofile}>save</button>
        </div>

    )
}

export default Dashboard
