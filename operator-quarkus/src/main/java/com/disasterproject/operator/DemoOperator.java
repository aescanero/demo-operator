package com.disasterproject.operator;

import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.annotations.QuarkusMain;

@QuarkusMain
public class DemoOperator {
    public static void main(String... args) {
        Quarkus.run(args);
    }
}
