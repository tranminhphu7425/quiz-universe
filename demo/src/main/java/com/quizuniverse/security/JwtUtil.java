package com.quizuniverse.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;
import java.security.Key;


import java.util.Date;



@Component
public class JwtUtil {

    private final String SECRET = "quizuniverse-secret-key-should-be-longer-1234567890"; // TODO: đặt trong application.properties
    private final long EXPIRATION = 1000 * 60 * 60 * 24; // 1 ngày
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());



    public String generateToken(Long userId) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                 .signWith(key, SignatureAlgorithm.HS256) 
                .compact();
    }

    public Long extractUserId(String token) {
        return Long.parseLong(
            Jwts.parserBuilder()
                .setSigningKey(SECRET.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject()
        );
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(SECRET.getBytes())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
