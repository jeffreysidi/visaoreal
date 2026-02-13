export const runtime = 'nodejs'

import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate email is present
    if (!body.email) {
      return Response.json({ error: 'E-mail é obrigatório' }, { status: 400 })
    }

    // Validate RESEND_API_KEY exists
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('SUBMIT_FORM_ERROR: RESEND_API_KEY is not configured')
      return Response.json(
        { 
          success: false,
          error: 'Configuração de e-mail indisponível no servidor'
        },
        { status: 500 }
      )
    }

    // Initialize Resend
    const resend = new Resend(apiKey)

    // Prepare email content
    const emailContent = `Formulário de Análise Estratégica - Visão Real

=== DADOS DO CLIENTE ===
Nome: ${body.nome || 'Não informado'}
E-mail: ${body.email}
Projeto/Negócio: ${body.projeto || 'Não informado'}
Tipo de Distribuição: ${body.tipoDist || 'Não informado'}

=== RESPOSTAS ESTRATÉGICAS ===
Principal desafio: ${body.desafio || 'Não informado'}
Tentativas anteriores: ${body.tentativas || 'Não informado'}
Decisão necessária: ${body.decisao || 'Não informado'}
Risco de inércia: ${body.risco || 'Não informado'}
Próximo avanço: ${body.avanço || 'Não informado'}
Informações adicionais: ${body.informacoes || 'Não informado'}`

    // Send to user (confirmation)
    const userEmailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: body.email,
      subject: 'Formulário recebido - Visão Real',
      text: emailContent,
    })

    if (userEmailResponse.error) {
      console.error('SUBMIT_FORM_ERROR: Failed to send user email:', userEmailResponse.error)
      return Response.json(
        { 
          success: false,
          error: 'Erro ao enviar confirmação por e-mail'
        },
        { status: 500 }
      )
    }

    // Send to admin
    const adminEmailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'jeffrey.sidi@gmail.com',
      subject: `[NOVO] Análise Estratégica - ${body.nome || 'Cliente'}`,
      text: emailContent,
    })

    if (adminEmailResponse.error) {
      console.error('SUBMIT_FORM_ERROR: Failed to send admin email:', adminEmailResponse.error)
      return Response.json(
        { 
          success: false,
          error: 'Erro ao enviar notificação ao administrador'
        },
        { status: 500 }
      )
    }

    // Success
    return Response.json(
      { 
        success: true,
        message: 'Formulário recebido com sucesso'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('SUBMIT_FORM_ERROR:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    
    return Response.json(
      { 
        success: false,
        error: errorMessage
      },
      { status: 500 }
    )
  }
}
