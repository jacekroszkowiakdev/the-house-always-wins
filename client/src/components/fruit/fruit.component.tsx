import "./fruit.styles.css";
import { Fruits } from "../../models/models";

interface FruitProps {
    delay: number;
    fruits: Fruits[];
    icon: string;
}

const Fruit: React.FC<FruitProps> = ({ fruits, icon, delay }: FruitProps) => {
    return (
        <div className="game-block">
            <img className="icon" src={icon} alt="spinner animation" />
        </div>
    );
};

export default Fruit;
