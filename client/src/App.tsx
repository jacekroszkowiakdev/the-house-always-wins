import "./App.css";
import { useState, useCallback, useEffect } from "react";
import GameTable from "./components/game-table/game-table.component";
import Button from "./components/button/button.component";
import { Fruits } from "./models/models";
import API from "./api/api";

const App: React.FC = () => {
    let [credits, setCredits] = useState<number>(0);
    let [isDisabled, setIsDisabled] = useState(false);
    let [fruits, setFruits] = useState<Fruits[]>([]);
    let [start, setStart] = useState(false);
    let [isSpinning, setIsSpinning] = useState(true);

    const [style, setStyle] = useState<React.CSSProperties>({
        position: "absolute",
        top: "270px",
        bottom: "100px",
        left: "auto",
        right: "270px",
    });

    useEffect(() => {
        let populateFruits = async () => {
            const response = await API.get("/welcome");
            const result = response.data;
            setFruits(result);
            if (fruits) {
                setIsSpinning(false);
            }
        };
        populateFruits();
    }, []);

    const beginSession = useCallback(async () => {
        const response = await API.get("/session");
        const result = await response.data;
        setCredits(result.ssn.credits);
    }, []);

    const spinTheFruits = useCallback(async () => {
        setIsSpinning(true);
        const response = await API.get("/session/game");
        const result = await response.data;
        console.log("result after spinning: ", result);
        setFruits(result);
        setIsSpinning(false);
    }, []);

    const getCredits = useCallback(async () => {
        const response = await API.get("/session");
        const result = await response.data.ssn.startCredits;
        setCredits(result);
    }, []);

    const messWithUser = useCallback(async () => {
        const directions = ["top", "bottom", "right", "left"] as const;
        let randomizePosition = Math.random();
        if (randomizePosition < 0.5) {
            const direction = directions[Math.round(Math.random() * 3)];
            setStyle({
                position: "absolute",
                [direction]: "300px",
            });
        }
    }, []);

    const disable = useCallback(async () => {
        let randomizeButtonDisable = Math.random();
        if (randomizeButtonDisable < 0.4) {
            setIsDisabled(true);
        }
    }, []);

    const enable = useCallback(() => {
        setIsDisabled(false);
    }, []);

    const startGame = useCallback(() => {
        setStart(true);
    }, []);

    console.log("is start ", start);

    return (
        <div className="App">
            <h1 className="heading">Fruit Machine</h1>
            <div className="slots-container">
                <GameTable
                    fruits={fruits}
                    isSpinning={isSpinning}
                    credits={credits}
                />

                {!start && (
                    <Button
                        buttonText="START"
                        handleOnClick={() => {
                            beginSession();
                            startGame();
                        }}
                        handleMouseOver={() => {}}
                        style={{
                            position: "absolute",
                            bottom: "100px",
                            right: "270px",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                        disabled={false}
                        id="start"
                    />
                )}

                {start && (
                    <Button
                        buttonText="SPIN"
                        handleOnClick={() => {
                            spinTheFruits();
                        }}
                        handleMouseOver={() => {}}
                        style={{
                            position: "absolute",
                            top: "240px",
                            bottom: "100px",
                            left: "280px",
                            right: "50px",
                        }}
                        disabled={false}
                        id="start"
                    />
                )}
                {start && (
                    <div
                        className="cash-out-container"
                        onMouseOut={() => enable()}
                    >
                        <Button
                            buttonText="CASH OUT"
                            handleOnClick={getCredits}
                            handleMouseOver={() => {
                                messWithUser();
                                disable();
                            }}
                            disabled={isDisabled}
                            style={style}
                            id="cash_out"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
