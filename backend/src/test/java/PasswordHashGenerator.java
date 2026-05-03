import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();

        String rawPassword = "tranminhphu7425"; // mật khẩu thường
        String hash = encoder.encode(rawPassword);

        System.out.println("Plain: " + rawPassword);
        System.out.println("Hash : " + hash);
    }
}
