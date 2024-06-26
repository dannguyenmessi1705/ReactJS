const Progress = ({index, numQuestion, answer, maxPoint, scores}) => {
    return (
        <header className="progress">
            <progress max={numQuestion} value={index + Number(answer !== null)}/>
            <p>Question <strong>{index+1}</strong> / {numQuestion}</p>
            <p>Scores <strong>{scores}</strong> / {maxPoint}</p>
        </header>
    )
}

export default Progress;