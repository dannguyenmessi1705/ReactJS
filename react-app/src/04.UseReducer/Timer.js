import { useEffect } from "react";

const Timer = ({dispatch, secondRemaining}) => {
    const min = Math.floor(secondRemaining / 60);
    const sec = secondRemaining % 60;
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({type: "tick"}); 
        }, 1000); // Mỗi 1s thì dispatch action "tick"
        return () => clearInterval(interval); // Xóa interval khi component bị unmount để tránh memory leak
    }, [secondRemaining]) // Chỉ chạy effect khi secondRemaining thay đổi
    return (
        <div className="timer">
            {min < 10 ? "0" + min : min}:{sec < 10 ? "0" + sec : sec}
        </div>
    )
}

export default Timer;