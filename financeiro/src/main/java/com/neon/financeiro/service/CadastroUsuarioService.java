package com.neon.financeiro.service;

import javax.persistence.PersistenceException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neon.financeiro.model.Usuario;
import com.neon.financeiro.repository.Usuarios;
import com.neon.financeiro.service.exception.ExclusaoException;

@Service
public class CadastroUsuarioService {

	private Usuarios usuarios;
	
	@Transactional
	public Usuario salvar(Usuario usuario) {
		return usuarios.save(usuario);
	}
	
	@Transactional
	public void excluir(Usuario usuario) {
		try {
			usuarios.delete(usuario);
			usuarios.flush();
		}catch(PersistenceException e) {
			throw new ExclusaoException("Não foi possível excluir o usuário");
		}
	}
}