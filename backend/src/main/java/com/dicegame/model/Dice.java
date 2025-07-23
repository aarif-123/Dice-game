package com.dicegame.model;

import java.util.Random;

public class Dice {
    private static final Random random = new Random();
    private static final int MIN_VALUE = 1;
    private static final int MAX_VALUE = 6;
    
    private int value;
    
    public Dice() {
        this.value = 0;
    }
    
    public int roll() {
        this.value = random.nextInt(MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE;
        return this.value;
    }
    
    public int getValue() {
        return value;
    }
    
    public void setValue(int value) {
        if (value >= MIN_VALUE && value <= MAX_VALUE) {
            this.value = value;
        } else {
            throw new IllegalArgumentException("Dice value must be between " + MIN_VALUE + " and " + MAX_VALUE);
        }
    }
    
    public boolean isValid() {
        return value >= MIN_VALUE && value <= MAX_VALUE;
    }
    
    @Override
    public String toString() {
        return "Dice{value=" + value + "}";
    }
}