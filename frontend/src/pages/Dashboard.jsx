import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
  const [education, seteducation] = useState("");
  const [college, setcollege] = useState("");
  const [graduationyear, setgraduationyear] = useState(
    new Date().getFullYear(),
  );
  const [targetrole, settargetrole] = useState("");
  const [githuburl, setgithuburl] = useState("");
  const [linkedinurl, setlinkedinurl] = useState("");
  const [skills, setskills] = useState([]);
  const [skillstring, setskillstring] = useState("");
  const [projects, setProjects] = useState([]);
  const [isprofileexist, setisprofileexist] = useState(true);

  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
    techstack: "",
  });
  const token = localStorage.getItem("token");
  const fetchprofile = async () => {
    console.log("fetchProfile called");
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        seteducation(data.education);
        setcollege(data.college);
        setgraduationyear(data.graduationyear);
        settargetrole(data.targetrole);
        setgithuburl(data.githuburl);
        setlinkedinurl(data.linkedinurl);

        setskills(data.skills);
        setskillstring(data.skills.join(", "));

        setProjects(data.projects);

        setisprofileexist(true);
      } else {
        setisprofileexist(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
  fetchprofile();
}, []);
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
    };
    setProjects([...projects, project]);
    setCurrentProject({
      title: "",
      description: "",
      techstack: "",
    });
  };
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
  const logout = async()=>{
    localStorage.removeItem("token");
    navigate("/login");
  };
  const saveprofile = async () => {
    const updatedSkills = skillstring
  .split(",")
  .map((skill) => skill.trim());
  console.log("saveprofile started")
    try {
        const token = localStorage.getItem("token");
        const res=await fetch(
            "http://localhost:3000/api/profile",{
                method: isprofileexist? "PUT":"POST",
                headers:{
                    
                    "Authorization": `Bearer ${token}`,
                    "content-type":"application/json"
                },
                body:JSON.stringify({
  education,
  college,
  graduationyear,
  targetrole,
  githuburl,
  linkedinurl,
  skills:updatedSkills,
  projects
})
            })
            const data = await res.json();

if (!res.ok) {
  console.log(data.message);
  return;
}

console.log(data.message);
setisprofileexist(true);


        
    } catch (error) {
        
  alert(error.message);
    
    }
  };
  return (
    <div>
      <h2>Education/Degree</h2>
      <input
        type="text"
        placeholder="education"
        value={education}
        onChange={(e) => seteducation(e.target.value)}
      />
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
        placeholder="skills"
        value={skillstring}
        onChange={(e) => setskillstring(e.target.value)}
      />
      <h2>projects</h2>
      <input
        type="text"
        placeholder="title"
        value={currentProject.title}
        onChange={(e) =>
          setCurrentProject({ ...currentProject, title: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="description"
        value={currentProject.description}
        onChange={(e) =>
          setCurrentProject({ ...currentProject, description: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="techstack"
        value={currentProject.techstack}
        onChange={(e) =>
          setCurrentProject({ ...currentProject, techstack: e.target.value })
        }
      />
      <button onClick={addproject}>add project</button>
      <div>
        {projects.map((project, index) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            key={index}
          >
            <h3>{project.title}</h3>
            <button onClick={() => deleteProject(index)}>X</button>
          </div>
        ))}{" "}
      </div>

      <button onClick={() => saveprofile()}>save</button>
      <button onClick={logout}>log out </button>
    </div>
  );
};

export default Dashboard;
