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
  const [analysis, setAnalysis] = useState(null);
const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
    techstack: "",
  });
  
  const fetchprofile = async () => {
    const token = localStorage.getItem("token");
    console.log("fetchProfile called");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
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
const analyzeProfile = async () => {
  
  try {
    setLoadingAnalysis(true);

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/analyze`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    setAnalysis(data.analysis);

  } catch (error) {
    console.log(error);
  } finally {
    setLoadingAnalysis(false);
  }
};
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
    const token = localStorage.getItem("token");
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
            `${import.meta.env.VITE_API_URL}/api/profile`,{
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
  <div className="dashboard-container">

    <div className="dashboard-header">
      <h1>AI Career Dashboard</h1>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>


    <div className="profile-card">

      <h2>Education Details</h2>

      <input
        className="input-field"
        type="text"
        placeholder="Education/Degree"
        value={education}
        onChange={(e) => seteducation(e.target.value)}
      />

      <input
        className="input-field"
        type="text"
        placeholder="College"
        value={college}
        onChange={(e) => setcollege(e.target.value)}
      />

      <input
        className="input-field"
        type="number"
        placeholder="Graduation Year"
        value={graduationyear}
        onChange={(e) => setgraduationyear(e.target.value)}
      />


      <h2>Career Goal</h2>

      <input
        className="input-field"
        type="text"
        placeholder="Target Role"
        value={targetrole}
        onChange={(e) => settargetrole(e.target.value)}
      />


      <h2>Profiles</h2>

      <input
        className="input-field"
        type="text"
        placeholder="GitHub URL"
        value={githuburl}
        onChange={(e) => setgithuburl(e.target.value)}
      />

      <input
        className="input-field"
        type="text"
        placeholder="LinkedIn URL"
        value={linkedinurl}
        onChange={(e) => setlinkedinurl(e.target.value)}
      />


      <h2>Skills</h2>

      <input
        className="input-field"
        type="text"
        placeholder="React, Node, MongoDB"
        value={skillstring}
        onChange={(e) => setskillstring(e.target.value)}
      />



      <h2>Projects</h2>

      <input
        className="input-field"
        placeholder="Project Title"
        value={currentProject.title}
        onChange={(e) =>
          setCurrentProject({...currentProject,title:e.target.value})
        }
      />

      <input
        className="input-field"
        placeholder="Project Description"
        value={currentProject.description}
        onChange={(e) =>
          setCurrentProject({...currentProject,description:e.target.value})
        }
      />

      <input
        className="input-field"
        placeholder="Tech Stack (React, Node)"
        value={currentProject.techstack}
        onChange={(e) =>
          setCurrentProject({...currentProject,techstack:e.target.value})
        }
      />


      <button className="secondary-btn" onClick={addproject}>
        Add Project
      </button>


      <div className="project-list">

        {projects.map((project,index)=>(
          <div className="project-item" key={index}>

            <span>{project.title}</span>

            <button
              className="delete-btn"
              onClick={()=>deleteProject(index)}
            >
              Delete
            </button>

          </div>
        ))}

      </div>


      <button className="save-btn" onClick={saveprofile}>
        Save Profile
      </button>


      <button
        className="analyze-btn"
        onClick={analyzeProfile}
      >
        {loadingAnalysis ? "Analyzing..." : "Analyze Profile"}
      </button>

    </div>



    {analysis && (

      <div className="analysis-container">


        <div className="analysis-card">
          <h2>Strengths</h2>

          {analysis.strengths.map((item,index)=>(
            <p key={index}>✓ {item}</p>
          ))}

        </div>



        <div className="analysis-card">

          <h2>Weaknesses</h2>

          {analysis.weaknesses.map((item,index)=>(
            <p key={index}>• {item}</p>
          ))}

        </div>



        <div className="analysis-card">

          <h2>Missing Skills</h2>

          {analysis.missingSkills.map((item,index)=>(
            <p key={index}>• {item}</p>
          ))}

        </div>



        <div className="analysis-card">

          <h2>Career Roadmap</h2>

          {analysis.careerRoadmap.map((item,index)=>(
            <p key={index}>
              {index+1}. {item}
            </p>
          ))}

        </div>


      </div>

    )}

  </div>
);
};

export default Dashboard;
