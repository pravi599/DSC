import React, { useState, useEffect } from 'react';
import './ConsultantList.css';
import './Filters.css';
import { FileText } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
 
function ConsultantsPage() {
  const [consultants, setConsultants] = useState([]);
  const [search, setSearch] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const response = await fetch('https://localhost:7117/api/ResumeDetail');
        if (!response.ok) throw new Error('Failed to fetch consultant data.');
        const data = await response.json();
 
        const enrichedData = data.map((c, index) => ({
          id: c.id || index,
          name: c.name || '',
          email: c.email || 'applicant@example.com',
          jdId: c.jdId || null,
          skills: c.skills ? c.skills.split(',').map(skill => skill.trim()) : [],
          experience: c.experience || 0,
          userCommunicationStatus: c.userCommunicationStatus || '',
          status: 'Available',
        }));
 
        setConsultants(enrichedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
 
    fetchConsultants();
  }, []);
 
  const filterConsultants = () => {
    return consultants.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.skills.join(', ').toLowerCase().includes(search.toLowerCase());
 
      const matchesExperience =
        experienceFilter === '' ||
        (experienceFilter === '0-2' && c.experience <= 2) ||
        (experienceFilter === '3-5' && c.experience >= 3 && c.experience <= 5) ||
        (experienceFilter === '6+' && c.experience >= 6);
 
      return matchesSearch && matchesExperience;
    });
  };
 
  const generateExcelReport = (consultant) => {
    const data = [
      {
        Name: consultant.name,
        Skills: consultant.skills.join(', '),
        Experience: `${consultant.experience} yrs`,
      },
    ];
 
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Consultant Report');
 
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${consultant.name}_report.xlsx`);
  };
 
  const sendEmail = async (consultant) => {
    if (!consultant.id) {
      alert('❌ Consultant ID missing.');
      return;
    }
 
    const url = `https://localhost:7117/api/ResumeDetail?id=${consultant.id}`;
 
    try {
      const response = await fetch(url, {
        method: 'POST'
      });
 
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
 
      const resultText = await response.text();
 
      // Update the consultant's communication status based on result
      setConsultants(prev =>
        prev.map(c =>
          c.id === consultant.id
            ? { ...c, userCommunicationStatus: resultText }
            : c
        )
      );
 
      if (resultText === 'Sent') {
        alert('✅ Email sent successfully');
      } else {
        alert('⚠️ Email send failed.');
      }
    } catch (err) {
      alert(`❌ Failed to send email: ${err.message}`);
    }
  };
 
  if (loading) return <div className="consultants-container">Loading consultants...</div>;
  if (error) return <div className="consultants-container error">Error: {error}</div>;
 
  return (
    <div className="consultants-container">
      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search Name or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)}>
          <option value="">All Experience</option>
          <option value="0-2">0-2 yrs</option>
          <option value="3-5">3-5 yrs</option>
          <option value="6+">6+ yrs</option>
        </select>
      </div>
 
      {/* Table */}
      <table className="consultant-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Report</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filterConsultants().map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.skills.join(', ')}</td>
              <td>{c.experience} yrs</td>
              <td>
                <button className="btn-consultant" onClick={() => generateExcelReport(c)}>
                  <FileText size={16} style={{ marginRight: '6px' }} />
                  Generate Report
                </button>
              </td>
              <td>
                <button
                  className="btn-consultant"
                  onClick={() => sendEmail(c)}
                  disabled={c.userCommunicationStatus === 'Sent'}
                >
                  {c.userCommunicationStatus === 'Sent' ? '✅ Sent' : '✉️ Send Email'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default ConsultantsPage;