package com.neon.financeiro.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neon.financeiro.model.Transacao;
import com.neon.financeiro.repository.Transacoes;

@Service
public class CadastroTransacaoService {

	private Transacoes transacoes;
	
	@Transactional
	public Transacao salvar(Transacao transacao) {
		return transacoes.save(transacao);
	}
}