import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import '../../css/ScoreDistributionChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ScoreDistributionChart = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://webdev-intern-backend-production.up.railway.app/api/diem-thi/thong-ke');
                setData(response.data);
                setError('');
            } catch (err) {
                setError('Không thể tải dữ liệu từ API!');
                setData(null);
            }
        };
        fetchData();
    }, []);

    if (error) return <div className="error">{error}</div>;
    if (!data) return <div>Đang tải dữ liệu...</div>;

    const labels = Object.keys(data); // Các môn học: ['toan', 'ngu_van', ...]

    const datasets = [
        {
            label: '>=8',
            data: labels.map((subject) => data[subject]['>=8']),
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Màu xanh lam
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
        {
            label: '>=6 và <8',
            data: labels.map((subject) => data[subject]['>=6_and_<8']),
            backgroundColor: 'rgba(255, 159, 64, 0.6)', // Màu cam
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
        },
        {
            label: '>=4 và <6',
            data: labels.map((subject) => data[subject]['>=4_and_<6']),
            backgroundColor: 'rgba(255, 205, 86, 0.6)', // Màu vàng
            borderColor: 'rgba(255, 205, 86, 1)',
            borderWidth: 1,
        },
        {
            label: '<4',
            data: labels.map((subject) => data[subject]['<4']),
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Màu đỏ
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
    ];

    const chartData = {
        labels: labels, // Trục X: các môn học
        datasets: datasets,
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Phân Bố Điểm Theo Môn Học',
                font: {
                    size: 20,
                },
            },
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.raw;
                        return `${label}: ${value} thí sinh`;
                    },
                },
            },
        },
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Môn Học',
                },
                ticks: {
                    callback: (value, index) => {
                        const subjects = {
                            toan: 'Toán',
                            ngu_van: 'Ngữ Văn',
                            ngoai_ngu: 'Ngoại Ngữ',
                            vat_li: 'Vật Lý',
                            hoa_hoc: 'Hóa Học',
                            sinh_hoc: 'Sinh Học',
                            lich_su: 'Lịch Sử',
                            dia_li: 'Địa Lý',
                            gdcd: 'GDCD',
                        };
                        return subjects[labels[index]];
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Số Lượng Thí Sinh',
                },
                beginAtZero: true,
                // Xóa stacked để chuyển sang grouped bar chart
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="chart-container">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ScoreDistributionChart;