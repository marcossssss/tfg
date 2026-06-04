public class Main {

    public static void main(String[] args) {

        EstadoTermodinamico estadoInicial =
                new EstadoTermodinamico(
                        100000,
                        1,
                        300);

        EstadoTermodinamico estadoFinal =
                new EstadoTermodinamico(
                        50000,
                        2,
                        300);

        CalculadoraTermodinamica calculadora =
                new CalculadoraTermodinamica();

        ResultadoProceso resultado =
                calculadora.calcularIsotermo(
                        estadoInicial,
                        estadoFinal,
                        1);

        System.out.println(resultado);
    }
}