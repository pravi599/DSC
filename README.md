Document Similarity Comparison and Ranking

Problem Statement

In the recruitment process, it is essential to efficiently match job descriptions (JDs) with 
the profiles of available consultants. This involves comparing and ranking the similarity 
between two types of text documents:

• Document #1: Job Description (JD) embedded in an AR (Automated Requisition).
• Document #2: Set of profiles of consultants.

The goal is to compare the similarity of these documents based on skills, experience, and 
contextual information, and then rank the consultant profiles based on their match with 
the JD. The system should send an email to the AR requestor with the top 3 matches or 
notify the recruiter if no suitable matches are found.
Key challenges include:

• Contextual Comparison: Accurately comparing documents based on skills, 
experience, and contextual relevance.
• Ranking Profiles: Effectively ranking consultant profiles based on their similarity to 
the JD.
• Automated Communication: Sending automated emails to the AR requestor or 
recruiter based on the comparison results.

This solution aims to streamline the recruitment process by automating the comparison 
and ranking of consultant profiles against JDs, ensuring efficient and accurate matching.
Expected Solution Overview
We will leverage an open-source AI-based multi-agent framework to decompose the 
workflow into specialized, cooperating agents, and expose control and status via a rich 
Web UI. Below are examples of the agents involved:
Agent Role & Inputs Outputs Reasoning / Generative AI Use
Comparison 
Agent
Job Description (JD), 
Consultant Profiles
Similarity scores 
between JD and 
profiles
Compare documents based 
on skills, experience, and 
contextual information.
Ranking Agent Similarity scores
Ranked list of 
consultant profiles
Rank profiles based on their 
similarity scores to the JD.
Communication 
Agent
Ranked list of profiles, 
AR requestor email, 
Recruiter email
Automated emails 
to AR requestor or 
recruiter
Send emails with top 3 
matches or notify the 
recruiter if no matches are 
found.
We can use any database and synthetic data to simulate the solutions.
Web UI Design
This solution must provide both recruiters and AR requestors with web UI pages with live 
visibility.
For AR Requestors:
• Current Matching Status Dashboard:
• JD Comparison Status (Completed / In Progress)
• Top 3 Matches (Listed / Not Found)
• Email Notification Status (Sent / Pending)
• Real-Time Workflow Progress Bar with below action items:
• JD Compared
• Profiles Ranked
• Email Sent to AR Requestor
For Recruiters:
• Admin Console includes:
• JD Search & Filters (by skills, experience, status).
• View agentic framework-managed queues, latencies, error rates.
• Report Generation about matching results by JD or consultant profile.
This design ensures that both AR requestors and recruiters have real-time visibility and 
control over the document comparison and ranking process, leading to more efficient and 
effective recruitment.
