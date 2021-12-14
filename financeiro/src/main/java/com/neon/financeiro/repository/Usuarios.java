package com.neon.financeiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.google.common.base.Optional;
import com.neon.financeiro.model.Usuario;

@Repository
public interface Usuarios extends JpaRepository<Usuario, Long>{

	Optional<Usuario> findByEmail(String email);
}
