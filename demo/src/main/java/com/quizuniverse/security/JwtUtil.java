package com.quizuniverse.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET = "quizuniverse-secret-key-should-be-longer-1234567890";
    private final long EXPIRATION = 1000 * 60 * 60 * 24; // 1 ngày
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    /** Sinh token với userId nằm trong subject */
    public String generateToken(String userId) {
        return Jwts.builder()
                .setSubject(userId) // 👈 userId trong subject
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /** Lấy userId từ token (subject) */
    public String extractUserId(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

    }

    /** Kiểm tra token hợp lệ */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

}
