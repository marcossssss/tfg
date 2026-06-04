public class EstadoTermodinamico {

    private double presion;
    private double volumen;
    private double temperatura;

    public EstadoTermodinamico(double presion, double volumen, double temperatura) {
        this.presion = presion;
        this.volumen = volumen;
        this.temperatura = temperatura;
    }

    public double getPresion() {
        return presion;
    }

    public double getVolumen() {
        return volumen;
    }

    public double getTemperatura() {
        return temperatura;
    }

    @Override
    public String toString() {
        return "EstadoTermodinamico{" +
                "presion=" + presion +
                ", volumen=" + volumen +
                ", temperatura=" + temperatura +
                '}';
    }
}