import React, { useState, useEffect } from 'react';
import './JDReportPage.css';
import RecruiterLayout from './RecruiterLayout';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
 
function JDReportPage() {
  const [jds, setJds] = useState([]);
  const [selectedJD, setSelectedJD] = useState(null);
  const [matchedProfiles, setMatchedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
  useEffect(() => {
    const fetchJDs = async () => {
      try {
        const response = await fetch('https://localhost:7117/api/JobDescription');
        if (!response.ok) throw new Error('Failed to fetch job descriptions');
        const data = await response.json();
        setJds(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
 
    fetchJDs();
  }, []);
 
  const downloadExcel = (jdTitle, profilesArr) => {
    if (profilesArr.length === 0) {
      alert('No matching profiles to export.');
      return;
    }
 
    const data = profilesArr.map(profile => ({
      Name: profile.name,
      Email: profile.email,
      Skills: profile.skills,
      Experience: `${profile.experience} yrs`,
      Score: profile.score,
    }));
 
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Matched Profiles');
 
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(
      new Blob([buffer], { type: 'application/octet-stream' }),
      `${jdTitle.replace(/\s+/g, '_')}_profiles.xlsx`
    );
  };
 
  const handleGenerate = (jd) => {
    const requiredSkills = extractSkillsFromDescription(jd.description);
    const matches = (jd.resumeDetails || []).filter(profile =>
      requiredSkills.every(skill =>
        profile.skills.toLowerCase().includes(skill.toLowerCase())
      )
    );
 
    setSelectedJD(jd);
    setMatchedProfiles(matches);
 
    downloadExcel(jd.jdTitle, matches);
  };
 
  const extractSkillsFromDescription = (description) => {
    const skillsPattern = /([A-Za-z0-9#.+-]+)/g;
    const knownKeywords = ['React', 'Node.js', 'SQL', 'Java', 'C#', 'ASP.NET', 'Azure', 'Git', 'Microservices', 'REST', 'MVC'];
    const matches = description.match(skillsPattern) || [];
    return matches.filter(word => knownKeywords.includes(word));
  };
 
  if (loading) return <div className="jd-page-container">Loading...</div>;
  if (error) return <div className="jd-page-container error">Error: {error}</div>;
 
  return (
    <RecruiterLayout active="jd-report">
      <div className="jd-page-container">
        {/* <h1>Job Descriptions</h1> */}
 
        <table className="jd-table">
          <thead>
            <tr>
              <th>
                <div className="header-icon-label">
                  <span role="img" aria-label="Name">📄</span>
                  <span>Job Description</span>
                </div>
              </th>
              <th>
                <div className="header-icon-label">
                  <span role="img" aria-label="Skills">🛠️</span>
                  <span>Skills</span>
                </div>
              </th>
              <th>
                <div className="header-icon-label">
                  <span role="img" aria-label="Report">📊</span>
                  <span>Report</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {jds.map(jd => {
              const skills = extractSkillsFromDescription(jd.description || '');
              return (
                <tr key={jd.jdId}>
                  <td>{jd.jdTitle}</td>
                  <td>{skills.join(', ')}</td>
                  <td>
                    <button className="generate-btn" onClick={() => handleGenerate(jd)}>
                      Generate Report
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
 
        {selectedJD && (
          <div className="report-section">
            <h2>Report for: {selectedJD.jdTitle}</h2>
            {matchedProfiles.length > 0 ? (
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Consultant Name</th>
                    <th>Email</th>
                    <th>Skills</th>
                    <th>Experience</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {matchedProfiles.map(profile => (
                    <tr key={profile.id}>
                      <td>{profile.name}</td>
                      <td>{profile.email}</td>
                      <td>{profile.skills}</td>
                      <td>{profile.experience} yrs</td>
                      <td>{profile.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-match">No matching profiles found.</p>
            )}
          </div>
        )}
      </div>
    </RecruiterLayout>
  );
}
 
export default JDReportPage;