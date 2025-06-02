"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AtendimentoRow {
  id: string
  nomeMedico: string
  especialidade: string
  diaSemana: string
  diasMes: string
  horaAtendimento: string
  qtdePrimeiraVez: string
  qtdeRetorno: string
  egresso: string
}

const medicosEspecialidades = {
  "ANA CAROLINA NUNES RIBEIRO": [
    "Grupo – Fonoaudiologia II",
    "Grupo – Reabilitação Auditiva",
    "BERA (Potencial Evocado Auditivo de Tronco Encefálico)",
  ],
  "DANIEL BRAZ NUNES AZEVEDO": ["Reabilitação em Pessoa com Deficiência Auditiva"],
  "JOSYANE BORGES DA SILVA GONÇALVES": ["Reabilitação em Pessoa com Deficiência Auditiva"],
  "IGOR MEDEIROS DOS SANTOS": ["Avaliação Paciente Ostomizado", "Consulta em Reabilitação Física"],
  "LEONARDO MACHADO XAVIER DE OLIVEIRA": ["Consulta em Reabilitação Intelectual / Autismo"],
  "DANIEL MEDLIG DE SOUSA CRAVO": ["Consulta em Reabilitação Visual I"],
}

const diasSemana = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO", "DOMINGO"]

export default function EscalaAmbulatorial() {
  const [mesReferencia, setMesReferencia] = useState("")
  const [unidade, setUnidade] = useState("")
  const [atendimentos, setAtendimentos] = useState<AtendimentoRow[]>([
    {
      id: "1",
      nomeMedico: "",
      especialidade: "",
      diaSemana: "",
      diasMes: "",
      horaAtendimento: "",
      qtdePrimeiraVez: "",
      qtdeRetorno: "",
      egresso: "",
    },
  ])

  const adicionarLinha = () => {
    const novaLinha: AtendimentoRow = {
      id: Date.now().toString(),
      nomeMedico: "",
      especialidade: "",
      diaSemana: "",
      diasMes: "",
      horaAtendimento: "",
      qtdePrimeiraVez: "",
      qtdeRetorno: "",
      egresso: "",
    }
    setAtendimentos([...atendimentos, novaLinha])
  }

  const removerLinha = (id: string) => {
    if (atendimentos.length > 1) {
      setAtendimentos(atendimentos.filter((item) => item.id !== id))
    }
  }

  const atualizarLinha = (id: string, campo: keyof AtendimentoRow, valor: string) => {
    setAtendimentos(atendimentos.map((item) => (item.id === id ? { ...item, [campo]: valor } : item)))
  }

  const selecionarMedico = (id: string, nomeMedico: string) => {
    setAtendimentos(
      atendimentos.map((item) =>
        item.id === id
          ? { ...item, nomeMedico, especialidade: "" } // Limpa a especialidade quando muda o médico
          : item,
      ),
    )
  }

  const exportarPDF = async () => {
    const { jsPDF } = await import("jspdf")
    const { default: autoTable } = await import("jspdf-autotable")

    const doc = new jsPDF("landscape", "mm", "a4")

    // Configurar fonte
    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)

    // Título centralizado
    const pageWidth = doc.internal.pageSize.getWidth()
    const titulo = "ESCALA AMBULATORIAL – REGULAÇÃO"
    const tituloWidth = doc.getTextWidth(titulo)
    doc.text(titulo, (pageWidth - tituloWidth) / 2, 20)

    // Informações do cabeçalho
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`REFERENTE AO MÊS: ${mesReferencia}`, 20, 35)
    doc.text(`UNIDADE: ${unidade}`, 20, 45)

    // Preparar dados da tabela
    const headers = [
      "NOME DO MÉDICO",
      "ESPECIALIDADE CONFORME CONFIG. SISREG",
      "DIA DA SEMANA",
      "DIA(S) DO MÊS",
      "HORA DO ATENDIMENTO",
      "QTDE 1ª VEZ",
      "QTDE RETORNO",
      "EGRESSO",
    ]

    const data = atendimentos.map((item) => [
      item.nomeMedico,
      item.especialidade,
      item.diaSemana,
      item.diasMes,
      item.horaAtendimento,
      item.qtdePrimeiraVez,
      item.qtdeRetorno,
      item.egresso,
    ])

    // Gerar tabela
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 55,
      styles: {
        fontSize: 9,
        cellPadding: 3,
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        textColor: [0, 0, 0],
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 40, halign: "left" },
        1: { cellWidth: 50, halign: "left" },
        2: { cellWidth: 25 },
        3: { cellWidth: 20 },
        4: { cellWidth: 25 },
        5: { cellWidth: 20 },
        6: { cellWidth: 20 },
        7: { cellWidth: 20 },
      },
      margin: { left: 20, right: 20 },
    })

    // Salvar PDF
    doc.save(`Escala_Ambulatorial_${mesReferencia.replace("/", "_")}.pdf`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader className="text-center border-b">
            <CardTitle className="text-2xl font-bold text-gray-800">ESCALA AMBULATORIAL – REGULAÇÃO</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {/* Cabeçalho */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-100 rounded">
              <div>
                <Label htmlFor="mes" className="text-sm font-semibold">
                  REFERENTE AO MÊS:
                </Label>
                <Input
                  id="mes"
                  value={mesReferencia}
                  onChange={(e) => setMesReferencia(e.target.value)}
                  placeholder="Ex: FEVEREIRO/2025"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="unidade" className="text-sm font-semibold">
                  UNIDADE:
                </Label>
                <Input
                  id="unidade"
                  value={unidade}
                  onChange={(e) => setUnidade(e.target.value)}
                  placeholder="Ex: APAE DE COLINAS"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2 text-xs font-semibold text-left">NOME DO MÉDICO</th>
                    <th className="border border-gray-300 p-2 text-xs font-semibold text-left">
                      ESPECIALIDADE CONFORME CONFIG. SISREG
                    </th>
                    <th className="border border-gray-300 p-2 text-xs font-semibold">DIA DA SEMANA</th>
                    <th className="border border-gray-300 p-2 text-xs font-semibold">DIA(S) DO MÊS</th>
                    <th className="border border-gray-300 p-2 text-xs font-semibold">HORA DO ATENDIMENTO</th>
                    <th className="border border-gray-300 p-2 text-xs font-semibold">QTDE 1ª VEZ</th>
                    <th className="border border-gray-300 p-2 text-xs font-semibold">QTDE RETORNO</th>
                    <th className="border border-gray-300 p-2 text-xs font-semibold">EGRESSO</th>
                    <th className="border border-gray-300 p-2 text-xs font-semibold">AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {atendimentos.map((atendimento) => (
                    <tr key={atendimento.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-1">
                        <Select
                          value={atendimento.nomeMedico}
                          onValueChange={(value) => selecionarMedico(atendimento.id, value)}
                        >
                          <SelectTrigger className="border-0 text-xs h-8">
                            <SelectValue placeholder="Selecionar médico" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(medicosEspecialidades).map((medico) => (
                              <SelectItem key={medico} value={medico} className="text-xs">
                                {medico}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="border border-gray-300 p-1">
                        <Select
                          value={atendimento.especialidade}
                          onValueChange={(value) => atualizarLinha(atendimento.id, "especialidade", value)}
                          disabled={!atendimento.nomeMedico}
                        >
                          <SelectTrigger className="border-0 text-xs h-8">
                            <SelectValue
                              placeholder={
                                atendimento.nomeMedico ? "Selecionar especialidade" : "Selecione o médico primeiro"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {atendimento.nomeMedico &&
                              medicosEspecialidades[atendimento.nomeMedico as keyof typeof medicosEspecialidades]?.map(
                                (especialidade) => (
                                  <SelectItem key={especialidade} value={especialidade} className="text-xs">
                                    {especialidade}
                                  </SelectItem>
                                ),
                              )}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="border border-gray-300 p-1">
                        <Select
                          value={atendimento.diaSemana}
                          onValueChange={(value) => atualizarLinha(atendimento.id, "diaSemana", value)}
                        >
                          <SelectTrigger className="border-0 text-xs h-8">
                            <SelectValue placeholder="Dia" />
                          </SelectTrigger>
                          <SelectContent>
                            {diasSemana.map((dia) => (
                              <SelectItem key={dia} value={dia} className="text-xs">
                                {dia}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="border border-gray-300 p-1">
                        <Input
                          value={atendimento.diasMes}
                          onChange={(e) => atualizarLinha(atendimento.id, "diasMes", e.target.value)}
                          className="border-0 text-xs h-8"
                          placeholder="Ex: 4, 11"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <Input
                          value={atendimento.horaAtendimento}
                          onChange={(e) => atualizarLinha(atendimento.id, "horaAtendimento", e.target.value)}
                          className="border-0 text-xs h-8"
                          placeholder="Ex: 13h30min"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <Input
                          value={atendimento.qtdePrimeiraVez}
                          onChange={(e) => atualizarLinha(atendimento.id, "qtdePrimeiraVez", e.target.value)}
                          className="border-0 text-xs h-8"
                          placeholder="Qtde"
                          type="number"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <Input
                          value={atendimento.qtdeRetorno}
                          onChange={(e) => atualizarLinha(atendimento.id, "qtdeRetorno", e.target.value)}
                          className="border-0 text-xs h-8"
                          placeholder="Qtde"
                          type="number"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <Input
                          value={atendimento.egresso}
                          onChange={(e) => atualizarLinha(atendimento.id, "egresso", e.target.value)}
                          className="border-0 text-xs h-8"
                          placeholder="Egresso"
                        />
                      </td>
                      <td className="border border-gray-300 p-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removerLinha(atendimento.id)}
                          disabled={atendimentos.length === 1}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-4 mt-6">
              <Button onClick={adicionarLinha} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Linha
              </Button>

              <Button
                onClick={exportarPDF}
                variant="outline"
                className="flex items-center gap-2"
                disabled={!mesReferencia || !unidade}
              >
                <Download className="h-4 w-4" />
                Exportar para PDF
              </Button>
            </div>

            {(!mesReferencia || !unidade) && (
              <p className="text-sm text-gray-500 mt-2">
                * Preencha o mês de referência e a unidade para habilitar a exportação
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
