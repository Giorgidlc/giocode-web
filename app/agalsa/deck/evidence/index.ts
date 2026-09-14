import sierradelademanda from './sierradelademanda.json'
import sierradelademandaIssues from './sierradelademanda.issues.json'
import agalsa from './agalsa.es.json'
import agalsaIssues from './agalsa.es.issues.json'
import demandavivienda from './demandavivienda.es.json'
import demandaviviendaIssues from './demandavivienda.es.issues.json'
import vivelademanda from './vivelademanda.com.json'
import vivelademandaIssues from './vivelademanda.com.issues.json'

export interface EvidenceData {
  web: string
  harFile: string
  title: string
  timings: {
    fullyLoadedMs: number
    ttiMs: number
    lcpMs: number
    fcpMs: number
    firstPaintMs: number
    onLoadMs: number
    onContentLoadMs: number
  }
  technical: {
    server: string
    php: string
    totalRequests: number
    status200: number
    statusError: number
    transferBytes: number
    transferMB: number
  }
}

export interface IssueItem {
  name: string
  type: string
  pct: string
  urls: string
}

export interface IssuesData {
  web: string
  source: string
  total: number
  alta: IssueItem[]
  media: IssueItem[]
  bajaCount: number
  bajaTop: IssueItem[]
}

// Un JSON por web en esta carpeta. Añade el import + la entrada al pasarme más HARs/CSVs.
export const EVIDENCE_MAP: Record<string, EvidenceData> = {
  'sierradelademanda.com': sierradelademanda as EvidenceData,
  'agalsa.es': agalsa as EvidenceData,
  'demandavivienda.es': demandavivienda as EvidenceData,
  'vivelademanda.com': vivelademanda as EvidenceData,
}

export const ISSUES_MAP: Record<string, IssuesData> = {
  'sierradelademanda.com': sierradelademandaIssues as IssuesData,
  'agalsa.es': agalsaIssues as IssuesData,
  'demandavivienda.es': demandaviviendaIssues as IssuesData,
  'vivelademanda.com': vivelademandaIssues as IssuesData,
}

export function getEvidence(web: string): EvidenceData | null {
  return EVIDENCE_MAP[web] ?? null
}

export function getIssues(web: string): IssuesData | null {
  return ISSUES_MAP[web] ?? null
}
