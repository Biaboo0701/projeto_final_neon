package com.neon.financeiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neon.financeiro.model.Transacao;

@Repository
public interface Transacoes extends JpaRepository<Transacao, Long>{

}
