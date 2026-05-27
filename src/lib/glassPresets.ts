import type { GlassSurfaceProps } from '../components/GlassSurface'

type GlassPreset = Partial<GlassSurfaceProps>

export const nyxGlass = {
  chip: {
    width: 'auto',
    height: 'auto',
    borderRadius: 9999,
    backgroundOpacity: 0.65,
    blur: 8,
    saturation: 1.35,
    displace: 0,
    distortionScale: -100,
    className: 'glass-surface--fit',
  } satisfies GlassPreset,

  panel: {
    width: '100%',
    height: 'auto',
    borderRadius: 20,
    backgroundOpacity: 0.7,
    blur: 11,
    saturation: 1.4,
    displace: 0.7,
    distortionScale: -140,
  } satisfies GlassPreset,

  card: {
    width: '100%',
    height: 'auto',
    borderRadius: 20,
    backgroundOpacity: 0.75,
    blur: 12,
    saturation: 1.5,
    displace: 0.5,
    distortionScale: -130,
  } satisfies GlassPreset,

  pill: {
    width: '100%',
    height: 'auto',
    borderRadius: 9999,
    backgroundOpacity: 0.68,
    blur: 10,
    saturation: 1.4,
    displace: 0,
    distortionScale: -110,
  } satisfies GlassPreset,

  toggle: {
    width: 'auto',
    height: 'auto',
    borderRadius: 9999,
    backgroundOpacity: 0.7,
    blur: 9,
    saturation: 1.35,
    className: 'glass-surface--fit',
  } satisfies GlassPreset,
} as const
