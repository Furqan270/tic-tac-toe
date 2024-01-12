import React, { useState } from "react";
import {ChakraProvider,Box,Grid,Button,Heading,Center} from "@chakra-ui/react";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function selectSquare(square) {
    if (calculateWinner(squares) || squares[square]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[square] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  function renderSquare(i) {
    
    return (
      <Button size="lg" fontSize="2xl" fontWeight="bold" colorScheme="telegram" className="square" onClick={() => selectSquare(i)}>{squares[i]}
      </Button>
      
    );
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${isXNext ? "X" : "O"}`;
    

  return (
    <Box>
      <Center>
      <Heading as="h2" size="lg" marginBottom="4">
        {status}
        
      </Heading>
      </Center>

      <Grid templateColumns="repeat(3, 1fr)" gap={2} width="300px" margin="auto"
      >
      {Array(9).fill(null).map((_, index) => (
        <Box key={index}>{renderSquare(index)}</Box>
          ))}
      </Grid>
      <Center>
        <Button marginTop="4" colorScheme="red" onClick={restart}>Restart Game</Button>
      </Center>
    </Box>
  );
}

function Game() {
  return (
    <Box>
      <Box>
        <Board />
      </Box>
    </Box>
  );
}

// Function to calculate the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <ChakraProvider>
      <Game />
    </ChakraProvider>
  );
}

export default App;
