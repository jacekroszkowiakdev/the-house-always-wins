import "./game-points.styles.css";

interface GamePointsProps {
    credits: number;
}

const GamePoints: React.FC<GamePointsProps> = ({
    credits,
}: GamePointsProps) => {
    return <div className="display-points">credits: {credits}</div>;
};

export default GamePoints;
