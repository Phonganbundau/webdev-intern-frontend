import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Top10KhoiA.css';

const Top10KhoiA = () => {
    const [topScores, setTopScores] = useState([]);
    const [error, setError] = useState('');

    // Gọi API khi component được mount
    useEffect(() => {
        const fetchTopScores = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/diem-thi/top10-khoi-a');
                setTopScores(response.data);
                setError('');
            } catch (err) {
                setError('Không thể tải dữ liệu top 10 khối A!');
                setTopScores([]);
            }
        };

        fetchTopScores();
    }, []);

    return (
        <div className="top10-container">
            <h2>Top 10 Thí Sinh Điểm Cao Nhất Khối A</h2>
            {error && <p className="error">{error}</p>}
            {topScores.length > 0 ? (
                <table className="top10-table">
                    <thead>
                        <tr>
                            <th>Hạng</th>
                            <th>Số báo danh</th>
                            <th>Toán</th>
                            <th>Vật lý</th>
                            <th>Hóa học</th>
                            <th>Tổng điểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topScores.map((student, index) => (
                            <tr key={student.id}>
                                <td>{index + 1}</td>
                                <td>{student.sbd}</td>
                                <td>{student.toan}</td>
                                <td>{student.vat_li}</td>
                                <td>{student.hoa_hoc}</td>
                                <td>{student.tong_diem}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Đang Tải Dữ Liệu...</p>
            )}
        </div>
    );
};

export default Top10KhoiA;