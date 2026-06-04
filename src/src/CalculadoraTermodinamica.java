public class CalculadoraTermodinamica {

    private static final double R = 8.314;

    public ResultadoProceso calcularIsotermo(
            EstadoTermodinamico inicial,
            EstadoTermodinamico finalEstado,
            double moles) {

        double trabajo =
                moles *
                        R *
                        inicial.getTemperatura() *
                        Math.log(
                                finalEstado.getVolumen()
                                        / inicial.getVolumen());

        double calor = trabajo;

        return new ResultadoProceso(trabajo, calor);
    }
}