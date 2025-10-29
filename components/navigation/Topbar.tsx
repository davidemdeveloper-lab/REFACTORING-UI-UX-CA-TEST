'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Sparkles, MoonStar } from 'lucide-react';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Avatar } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';

export function Topbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const suggestions = useMemo(
    () =>
      searchTerm.length > 1
        ? ['Giovanni Greco', 'Pacchetto Anniversary', 'Sequenza pre-check-in'].filter((item) =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [],
    [searchTerm]
  );

  return (
    <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-white/10 bg-[#0c1018]/80 px-8 py-6 backdrop-blur-xl">
      <HStack className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full max-w-xl">
          <Input variant="outline" size="lg" className="border-white/15 bg-white/5">
            <InputSlot>
              <InputIcon as={Search} className="text-white/60" />
            </InputSlot>
            <InputField
              placeholder="Cerca ospiti, prenotazioni o automazioni"
              value={searchTerm}
              onChangeText={setSearchTerm}
              accessibilityLabel="Campo di ricerca"
            />
            <InputSlot>
              <InputIcon as={SlidersHorizontal} className="text-white/60" />
            </InputSlot>
          </Input>
          {suggestions.length ? (
            <ul className="mt-2 space-y-1 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/70">
              {suggestions.map((item) => (
                <li key={item} className="rounded-xl px-3 py-2 hover:bg-white/10">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <HStack className="items-center gap-3">
          <Button action="secondary" variant="outline" size="sm" className="border-white/20 bg-white/5">
            <ButtonIcon as={Sparkles} className="text-[#f29c50]" />
            <ButtonText className="text-white">Crea automazione</ButtonText>
          </Button>
          <HStack className="items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2">
            <MoonStar className="h-4 w-4 text-white/60" strokeWidth={1.7} />
            <Switch value={true} accessibilityLabel="Attiva night mode" />
          </HStack>
          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-2">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">Davide Minardi</p>
              <p className="text-xs text-white/50">Hospitality Curator</p>
            </div>
            <Avatar>
              <Avatar.FallbackText>DM</Avatar.FallbackText>
            </Avatar>
          </div>
        </HStack>
      </HStack>
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/40">
        <span>STRUTTURA · Costa Azure Resort</span>
        <span className="h-px w-6 bg-white/20" />
        <span>SCENARIO OSPITI · Live + Predictive</span>
        <span className="h-px w-6 bg-white/20" />
        <span>VERSIONE · Concierge 3.2</span>
      </div>
    </header>
  );
}
