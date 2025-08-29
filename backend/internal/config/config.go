package config

import (
	"log"
	"os"
	"strconv"
	"time"
)

type Config struct {
	Addr         string
	DatabaseURL  string
	SessionTTL   time.Duration
	CookieDomain string
	CookieSecure bool
	AppEnv       string
}

func mustEnv(key, def string) string {
	v := os.Getenv(key)
	if v == "" {
		if def != "" {
			return def
		}
		log.Fatalf("ENV not found for the key of - %s", key)
	}
	return v
}

func boolEnv(key string, def bool) bool {
	v := os.Getenv(key)
	if v == "" {
		return def
	}
	b, err := strconv.ParseBool(v)
	if err != nil {
		return def
	}
	return b
}

func Load() *Config {
	ttl := time.Hour * 24 * 7
	if v := os.Getenv("SESSION_TTL_HOURS"); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			ttl = time.Duration(n) * time.Hour
		}
	}
	return &Config{
		Addr:         mustEnv("ADDR", ":8080"),
		DatabaseURL:  mustEnv("DATABASE_URL", ""),
		SessionTTL:   ttl,
		CookieDomain: os.Getenv("COOKIE_DOMAIN"),
		CookieSecure: boolEnv("COOKIE_SECURE", false),
		AppEnv:       os.Getenv("APP_ENV"),
	}
}
