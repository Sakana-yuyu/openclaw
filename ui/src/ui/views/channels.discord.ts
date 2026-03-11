import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import { formatRelativeTimestamp } from "../format.ts";
import type { DiscordStatus } from "../types.ts";
import { renderChannelConfigSection } from "./channels.config.ts";
import type { ChannelsProps } from "./channels.types.ts";

export function renderDiscordCard(params: {
  props: ChannelsProps;
  discord?: DiscordStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, discord, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${t("channelsPage.discord.title")}</div>
      <div class="card-sub">${t("channelsPage.discord.subtitle")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${t("channelsPage.fields.configured")}</span>
          <span>${discord?.configured ? t("cron.summary.yes") : t("cron.summary.no")}</span>
        </div>
        <div>
          <span class="label">${t("channelsPage.fields.running")}</span>
          <span>${discord?.running ? t("cron.summary.yes") : t("cron.summary.no")}</span>
        </div>
        <div>
          <span class="label">${t("channelsPage.fields.lastStart")}</span>
          <span>${discord?.lastStartAt ? formatRelativeTimestamp(discord.lastStartAt) : t("common.na")}</span>
        </div>
        <div>
          <span class="label">${t("channelsPage.fields.lastProbe")}</span>
          <span>${discord?.lastProbeAt ? formatRelativeTimestamp(discord.lastProbeAt) : t("common.na")}</span>
        </div>
      </div>

      ${
        discord?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${discord.lastError}
          </div>`
          : nothing
      }

      ${
        discord?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            ${t("channelsPage.common.probe")} ${discord.probe.ok ? t("channelsPage.common.probeOk") : t("channelsPage.common.probeFailed")} ·
            ${discord.probe.status ?? ""} ${discord.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "discord", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          ${t("channelsPage.common.probe")}
        </button>
      </div>
    </div>
  `;
}
