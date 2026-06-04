public class ResultadoProceso {

    private double trabajo;
    private double calor;

    public ResultadoProceso(double trabajo, double calor) {
        this.trabajo = trabajo;
        this.calor = calor;
    }

    public double getTrabajo() {
        return trabajo;
    }

    public double getCalor() {
        return calor;
    }

    @Override
    public String toString() {
        return "ResultadoProceso{" +
                "trabajo=" + trabajo +
                ", calor=" + calor +
                '}';
    }
}