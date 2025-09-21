import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import NumberCircle from './components/NumbleCircle';

export default function App() {
  const [userNumbers, setUserNumbers] = useState([]);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [matchesCount, setMatchesCount] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [blinkingOpacity] = useState(new Animated.Value(1));

  useEffect(() => {
    if (!isGameActive && matchesCount >= 4) {
      const blinkingInterval = setInterval(() => {
        Animated.sequence([
          Animated.timing(blinkingOpacity, {
            toValue: 0.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(blinkingOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }, 600);
      return () => clearInterval(blinkingInterval);
    }
  }, [isGameActive, matchesCount, blinkingOpacity]);

  const handleSelectNumber = (number) => {
    setUserNumbers((prevNumbers) => {
      const isSelected = prevNumbers.includes(number);
      if (isSelected) {
        return prevNumbers.filter((n) => n !== number).sort((a, b) => a - b);
      } else if (prevNumbers.length < 6) {
        return [...prevNumbers, number].sort((a, b) => a - b);
      }
      return prevNumbers;
    });
  };

  const handlePlay = () => {
    const randomNumbers = new Set();
    while (randomNumbers.size < 6) {
      randomNumbers.add(Math.floor(Math.random() * 60) + 1);
    }
    const generated = Array.from(randomNumbers).sort((a, b) => a - b);
    setDrawnNumbers(generated);

    const matches = userNumbers.filter((number) => generated.includes(number));
    setMatchesCount(matches.length);
    setIsGameActive(false);
  };

  const handleReset = () => {
    setUserNumbers([]);
    setDrawnNumbers([]);
    setMatchesCount(0);
    setIsGameActive(true);
    blinkingOpacity.setValue(1);
  };

  const getResultText = () => {
    if (matchesCount === 6) return 'SENA!';
    if (matchesCount === 5) return 'QUINA!';
    if (matchesCount === 4) return 'QUADRA!';
    return 'Não foi dessa vez. Tente novamente!';
  };

  const allNumbers = Array.from({ length: 60 }, (_, i) => i + 1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Mega-Sena Game</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.subTitle}>
          {isGameActive ? 'Selecione 6 números:' : 'Seus números selecionados:'}
        </Text>
        <View style={styles.userNumbersContainer}>
          {userNumbers.map((number) => (
            <NumberCircle
              key={number}
              number={number}
              isSelected={true}
              isDisabled={!isGameActive}
              onSelect={handleSelectNumber}
            />
          ))}
        </View>
      </View>

      {isGameActive && (
        <View style={styles.numberGrid}>
          {allNumbers.map((number) => (
            <NumberCircle
              key={number}
              number={number}
              isSelected={userNumbers.includes(number)}
              isDisabled={userNumbers.length >= 6 && !userNumbers.includes(number)}
              onSelect={handleSelectNumber}
            />
          ))}
        </View>
      )}

      {!isGameActive && (
        <View style={styles.sectionContainer}>
          <Text style={styles.subTitle}>Números sorteados:</Text>
          <View style={styles.drawnNumbersContainer}>
            {drawnNumbers.map((number) => (
              <NumberCircle
                key={number}
                number={number}
                isSelected={true}
                isDisabled={true}
                isMatch={userNumbers.includes(number)}
                onSelect={() => {}}
              />
            ))}
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Total de acertos: {matchesCount}</Text>
            <Animated.Text style={[styles.winnerText, { opacity: blinkingOpacity }]}>
              {getResultText()}
            </Animated.Text>
          </View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {isGameActive ? (
          <TouchableOpacity
            style={[styles.button, userNumbers.length < 6 && styles.disabledButton]}
            onPress={handlePlay}
            disabled={userNumbers.length < 6}
          >
            <Text style={styles.buttonText}>Confirmar Aposta</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Jogar Novamente</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00FFFF',
    padding: 14,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1b4ffd',
    marginTop: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1b4ffd',
    marginBottom: 12,
  },
  sectionContainer: {
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 14,
  },
  numberGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
  },
  userNumbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawnNumbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#1b4ffd',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 8,
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
    height: 200,
  },
  resultText: {
    fontSize: 26,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#1b4ffd',
    marginBottom: 8,
  },
  winnerText: {
    fontSize: 28,
    padding: 10,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
