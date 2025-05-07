import React, { useState, useCallback } from 'react';
import axios from 'axios';
import '../../css/SearchScore.css';
import { format } from 'date-fns';

const SearchScore = () => {
    // State để lưu số báo danh người dùng nhập và dữ liệu điểm thi từ API
    const [sbd, setSbd] = useState('');
    const [scores, setScores] = useState(null);
    const [error, setError] = useState('');

    // Hàm gọi API khi submit form
    const fetchScores = useCallback(async (sbdValue) => {
        try {
            const response = await axios.get(`https://webdev-intern-backend-production.up.railway.app/api/diem-thi/tra-cuu/${sbdValue}`);
            setScores(response.data);
            setError('');
        } catch (err) {
            setError('Không tìm thấy dữ liệu hoặc số báo danh không hợp lệ!');
            setScores(null);
        }
    }, []);

    // Xử lý khi submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (sbd.trim()) {
            fetchScores(sbd);
        } else {
            setError('Vui lòng nhập số báo danh!');
            setScores(null);
        }
    };

    // Hàm định dạng ngày từ API
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss');
    };

    return (
        <div className="search-score-container">
            {/* Phần nhập số báo danh */}
            <div className="card">
                <h2>Tra Cứu Điểm Thi THPT QG 2024</h2>
                <form onSubmit={handleSubmit}>
                    <label>Số Báo Danh:</label>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Nhập số báo danh"
                            value={sbd}
                            onChange={(e) => setSbd(e.target.value)}
                        />
                        <button type="submit">Xem</button>
                    </div>
                </form>
            </div>

            {/* Phần hiển thị điểm chi tiết */}
            <div className="card">
                <h2>Thông tin điểm thi</h2>
                {error && <p className="error">{error}</p>}
                {scores ? (
                    <div className="scores-details">
                        <p><strong>Số báo danh:</strong> {scores.sbd}</p>
                        <p><strong>Toán:</strong> {scores.toan}</p>
                        <p><strong>Ngữ văn:</strong> {scores.ngu_van}</p>
                        <p><strong>Ngoại ngữ ({scores.ma_ngoai_ngu}):</strong> {scores.ngoai_ngu}</p>
                        {scores.vat_li > 0 && <p><strong>Vật lý:</strong> {scores.vat_li}</p>}
                        {scores.hoa_hoc > 0 && <p><strong>Hóa học:</strong> {scores.hoa_hoc}</p>}
                        {scores.sinh_hoc > 0 && <p><strong>Sinh học:</strong> {scores.sinh_hoc}</p>}
                        {scores.lich_su > 0 && <p><strong>Lịch sử:</strong> {scores.lich_su}</p>}
                        {scores.dia_li > 0 && <p><strong>Địa lý:</strong> {scores.dia_li}</p>}
                        {scores.gdcd > 0 && <p><strong>GDCD:</strong> {scores.gdcd}</p>}
                        <p><strong>Ngày cập nhật:</strong> {formatDate(scores.updated_at)}</p>
                    </div>
                ) : (
                    <p>Hiển thị điểm thi chi tiết ở đây</p>
                )}
            </div>
        </div>
    );
};

export default SearchScore;