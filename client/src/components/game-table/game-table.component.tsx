import React, { useEffect, useState } from "react";
import "./game-table.styles.css";
import { Fruits } from "../../models/models";
import Fruit from "../fruit/fruit.component";
import Cherry from "../../svg/cherry.svg";
import Watermelon from "../../svg/watermelon.svg";
import Lemon from "../../svg/lemon.svg";
import Orange from "../../svg/orange.svg";
import GamePoints from "../../components/game-points/game-points.component";
import Spinner from "../../svg/spinner.svg";

interface GameTableProps {
    fruits: Fruits[];
    isSpinning: boolean;

    credits: number;
}

const FruitMap: Record<string, any> = {
    cherry: Cherry,
    watermelon: Watermelon,
    lemon: Lemon,
    orange: Orange,
};

const GameTable: React.FC<GameTableProps> = ({
    isSpinning,
    fruits,
    credits,
}: GameTableProps) => {
    let [displayFruit, setDisplayFruit] = useState(false);
    const delay = Math.floor(Math.random() * 3);
    const SpinnerElement = Spinner;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayFruit(true);
            return () => clearTimeout(timer);
        }, delay);
    }, [delay]);

    return (
        <div className="game-container key={id}">
            {isSpinning && displayFruit ? (
                <Fruit fruits={fruits} icon={SpinnerElement} delay={0} />
            ) : null}
            {isSpinning && displayFruit ? (
                <Fruit fruits={fruits} icon={SpinnerElement} delay={0} />
            ) : null}
            {isSpinning && displayFruit ? (
                <Fruit fruits={fruits} icon={SpinnerElement} delay={0} />
            ) : null}

            {!isSpinning && displayFruit ? (
                <Fruit
                    fruits={fruits}
                    icon={FruitMap[fruits[0].name]}
                    delay={1000}
                />
            ) : null}
            {!isSpinning && displayFruit ? (
                <Fruit
                    fruits={fruits}
                    icon={FruitMap[fruits[1].name]}
                    delay={2000}
                />
            ) : null}
            {!isSpinning && displayFruit ? (
                <Fruit
                    fruits={fruits}
                    icon={FruitMap[fruits[2].name]}
                    delay={3000}
                />
            ) : null}

            <GamePoints credits={credits} />
        </div>
    );
};

export default GameTable;
