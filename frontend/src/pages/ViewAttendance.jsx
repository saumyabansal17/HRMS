import React, { useEffect, useContext, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { UserContext } from '../UserContext';

// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend, Title);

const ViewAttendance = () => {
    const { user } = useContext(UserContext);
    const [remainingLeavesData, setRemainingLeavesData] = useState({
        labels: ['Sick Leave Remaining', 'Casual Leave Remaining', 'Paid Leave Remaining'],
        datasets: [{
            label: 'Remaining Leaves',
            data: [0, 0, 0],
            backgroundColor: [
                'rgba(255, 206, 86, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    });
    const [attendanceStatusData, setAttendanceStatusData] = useState({
        labels: ['Present', 'Absent', 'Leave'],
        datasets: [{
            label: 'Attendance Status',
            data: [0, 0, 0],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    });
    const [presentPercentage, setPresentPercentage] = useState(0);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:3001/api/attendance/user/${user.id}`, { withCredentials: true })
                .then(response => {
                    const attendance = response.data;

                    const totalDays = attendance.length;
                    const presentDays = attendance.filter(a => a.status === 'Present').length;
                    const absentDays = attendance.filter(a => a.status === 'Absent').length;
                    const leaveDays = attendance.filter(a => a.status === 'Leave').length;
                    const sickLeaves = attendance.filter(a => a.leaveType === 'Sick').length;
                    const casualLeaves = attendance.filter(a => a.leaveType === 'Casual').length;
                    const paidLeaves = attendance.filter(a => a.leaveType === 'Paid').length;

                    // Assuming these are the maximum allowed leaves per type
                    const maxSickLeaves = 10;
                    const maxCasualLeaves = 10;
                    const maxPaidLeaves = 10;

                    setRemainingLeavesData({
                        ...remainingLeavesData,
                        datasets: [{
                            ...remainingLeavesData.datasets[0],
                            data: [
                                maxSickLeaves - sickLeaves,
                                maxCasualLeaves - casualLeaves,
                                maxPaidLeaves - paidLeaves
                            ]
                        }]
                    });

                    setAttendanceStatusData({
                        ...attendanceStatusData,
                        datasets: [{
                            ...attendanceStatusData.datasets[0],
                            data: [
                                presentDays,
                                absentDays,
                                leaveDays
                            ]
                        }]
                    });

                    setPresentPercentage((presentDays / totalDays) * 100);
                })
                .catch(error => console.error(error));
        }
    }, [user]);

    return (
        <div>
            <h2>Attendance Overview</h2>
            <div>
                <h3>Remaining Leaves</h3>
                <Pie data={remainingLeavesData} />
            </div>
            <div>
                <h3>Attendance Status Distribution</h3>
                <Pie data={attendanceStatusData} />
            </div>
            <div>
                <h3>Present Percentage</h3>
                <p>{presentPercentage.toFixed(2)}%</p>
            </div>
        </div>
    );
};

export default ViewAttendance;
