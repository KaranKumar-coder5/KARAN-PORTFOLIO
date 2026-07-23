import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Section,
} from '@/components/ui'
import type { BiomeMeta } from '@/types'

type SectionPlaceholderProps = {
  biome: BiomeMeta
}

export function SectionPlaceholder({ biome }: SectionPlaceholderProps) {
  return (
    <Section id={biome.id} ariaLabel={biome.title}>
      <Card>
        <CardHeader>
          <Badge variant="default">{biome.label}</Badge>
          <CardTitle>{biome.title}</CardTitle>
          <CardDescription>{biome.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-muted">
            Placeholder — implementation coming in a future phase.
          </p>
        </CardContent>
      </Card>
    </Section>
  )
}
