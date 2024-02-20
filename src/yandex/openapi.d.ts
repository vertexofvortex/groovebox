import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        /**
         * Основная информация об аккаунте
         */
        export interface Account {
            /**
             * Текущая дата и время
             * example:
             * 2021-03-17T18:13:40+00:00
             */
            now: string;
            /**
             * Уникальный идентификатор
             */
            uid: number;
            /**
             * Виртуальное имя (обычно e-mail)
             */
            login: string;
            /**
             * Регион
             */
            region: number;
            /**
             * Полное имя (имя и фамилия)
             */
            fullName: string;
            /**
             * Фамилия
             */
            secondName: string;
            /**
             * Имя
             */
            firstName?: string;
            /**
             * Отображаемое имя
             */
            displayName: string;
            /**
             * Доступен ли сервис
             */
            serviceAvailable: boolean;
            /**
             * Является ли пользователем чьим-то другим
             */
            hostedUser: boolean;
            /**
             * Мобильные номера
             */
            "passport-phones": {
                phone?: string;
            }[];
        }
        export interface AdParams {
            partnerId: string;
            categoryId: string;
            pageRef: string;
            targetRef: string;
            otherParams: string;
            adVolume?: number;
            genreId?: number;
            genreName?: string;
        }
        export interface Album {
            /**
             * Идентификатор альбома
             */
            id: number;
            /**
             * Ошибка получения альбома
             */
            error?: string | null;
            /**
             * Название альбома
             */
            title: string;
            /**
             * Тип альбома
             */
            type: "single" | "podcast";
            /**
             * Мета тип
             */
            metaType: "single" | "podcast" | "music";
            /**
             * Год релиза
             */
            year: number;
            /**
             * Дата релиза в формате ISO 8601
             */
            releaseDate: string;
            /**
             * Ссылка на обложку
             */
            coverUri: string;
            /**
             * Ссылка на превью Open Graph
             */
            ogImage: string;
            /**
             * Жанр музыки
             */
            genre: string;
            buy: {
                [key: string]: any;
            }[];
            /**
             * Количество треков.
             */
            trackCount: number;
            /**
             * Является ли альбом новым
             */
            recent: boolean;
            /**
             * Популярен ли альбом у слушателей
             */
            veryImportant: boolean;
            /**
             * Артисты
             */
            artists: Artist[];
            /**
             * Лейблы
             */
            labels: {
                id?: number;
                name?: string;
            }[];
            /**
             * Доступен ли альбом
             */
            available: boolean;
            /**
             * Доступен ли альбом для пользователей с подпиской
             */
            availableForPremiumUsers: boolean;
            /**
             * Доступен ли альбом из приложения для телефона
             */
            availableForMobile: boolean;
            /**
             * Доступен ли альбом частично для пользователей без подписки
             */
            availablePartially: boolean;
            /**
             * ID лучших треков альбома
             */
            bests: number[];
            /**
             * Прероллы
             */
            prerolls: {
                [key: string]: any;
            }[];
            /**
             * Треки альбома, разделенные по дискам.
             */
            volumes: Track[][] | null;
        }
        /**
         * Блок с предупреждениями о конце подписки и подарках
         */
        export interface Alert {
            /**
             * Уникальный идентификатор
             */
            alertId?: string;
            /**
             * Текст предупреждения
             */
            text?: string;
            /**
             * Цвет заднего фона (HTML)
             */
            bgColor?: string;
            /**
             * Цвет текста (HTML)
             */
            textColor?: string;
            /**
             * Тип предупреждения
             * example:
             * Promo_rk360
             */
            alertType?: string;
            button?: /* кнопка со ссылкой */ AlertButton;
            /**
             * Наличие кнопки "Закрыть"
             */
            closeButton?: boolean;
        }
        /**
         * кнопка со ссылкой
         */
        export interface AlertButton {
            /**
             * Текст на кнопке
             */
            text?: string;
            /**
             * Цвет заднего фона (HTML)
             */
            bgColor?: string;
            /**
             * Цвет текста (HTML)
             */
            textColor?: string;
            /**
             * Ссылка, куда ведет кнопка
             */
            uri?: string;
        }
        export interface Artist {
            composer: boolean;
            cover?: Cover;
            decomposed?: {
                [key: string]: any;
            }[] | null;
            genres: {
                [key: string]: any;
            }[];
            id: string | number;
            name: string;
            various: boolean;
            popularTracks?: Track[] | null;
            /**
             * Имеются ли в продаже билеты на концерт
             */
            ticketsAvailable?: boolean | null;
            regions?: string[] | null;
        }
        export interface BadRequest {
            invocationInfo?: InvocationInfo;
            error?: Error;
        }
        /**
         * лучший результат поиска
         */
        export interface Best {
            /**
             * Тип лучшего результата
             */
            type?: string;
            text?: string;
            result?: Track | Artist | Album | /* play list data */ Playlist | /* Видео */ Video;
        }
        /**
         * Блоки главной страницы кнги и подкастов
         */
        export interface BooksAndPodcastsResult {
            title: string;
            blocks: {
                id: string;
                title?: string;
                type: string;
                typeForFrom: string;
                entities?: {
                    id?: string;
                    type?: string;
                    data?: {
                        [key: string]: any;
                    };
                }[];
            }[];
        }
        export interface Chart {
            bgColor: string;
            position: number;
            progress: "same" | "up" | "down";
            listeners: number;
            shift: number;
        }
        export interface ChartItem {
            id: number;
            playCount: number;
            recent: boolean;
            timestamp: string;
            track: Track;
            chart: Chart;
        }
        export interface Cover {
            custom: boolean;
            /**
             * Существует когда поле type = "pic"
             */
            dir?: string;
            type: "pic" | "mosaic";
            /**
             * Существует когда поле type = "mosaic"
             */
            itemsUri?: string[];
            /**
             * Существует когда поле type = "pic"
             */
            uri?: string;
            version?: string;
            /**
             * If exists other properties is missing
             */
            error?: string;
        }
        export interface Dashboard {
            dashboardId: string;
            stations: StationResult[];
            pumpkin: boolean;
        }
        /**
         * Класс, представляющий дискретное значение
         */
        export interface DiscreteScale {
            type?: string;
            name?: string;
            min?: MinMax;
            max?: MinMax;
        }
        export interface Error {
            /**
             * example:
             * validate
             */
            name?: string;
            /**
             * example:
             * Parameters requirements are not met
             */
            message?: string;
        }
        /**
         * режимы экспериментальных функций
         */
        export interface Experiments {
        }
        export interface FullChartResult {
            id: string;
            type: "chart";
            typeForFrom: string;
            title: string;
            chartDescription: string;
            menu: {
                menu: MenuItem;
            };
            chart: /* play list data */ Playlist;
        }
        /**
         * Плейлист дня, дежавю, премьера, ...
         */
        export interface GeneratedPlaylist {
            playlistUuid: string;
            description: string;
            descriptionFormatted: string;
            available: boolean;
            collective: boolean;
            cover?: Cover;
            created: string;
            modified: string;
            backgroundColor: string;
            textColor: string;
            durationMs: number;
            isBanner: boolean;
            isPremiere: boolean;
            kind: number;
            ogImage?: string;
            owner: Owner;
            prerolls?: {
                [key: string]: any;
            }[];
            revision: number;
            snapshot: number;
            tags: {
                id?: string;
                value?: string;
            }[];
            title: string;
            trackCount: number;
            uid: number;
            visibility: "public" | "private";
            likesCount: number;
            tracks: TrackItem[];
            /**
             * Доступно для плейлиста дня
             */
            animatedCoverUri?: string;
            coverWithoutText?: Cover;
            everPlayed?: boolean;
            generatedPlaylistType?: string;
            idForFrom?: string;
            madeFor?: {
                [key: string]: any;
            };
            playCounter?: {
                description: string;
                descriptionNext: string;
                updated: boolean;
                value: number;
            };
        }
        export interface GeneratedPlaylistLandingBlock {
            notify: boolean;
            ready: boolean;
            type: "playlistOfTheDay";
            data: /* Плейлист дня, дежавю, премьера, ... */ GeneratedPlaylist;
        }
        export interface Genre {
            /**
             * Уникальный идентификатор жанра
             */
            id: string;
            /**
             * Вес TODO (возможно, чем выше показатель, тем больше нравится пользователю)
             */
            weight: number;
            composerTop: boolean;
            /**
             * Заголовок жанра
             */
            title: string;
            /**
             * Словарь заголовков на разных языках, где ключ - язык
             */
            titles: {
                [name: string]: {
                    title: string;
                    fullTitle: string;
                };
            };
            /**
             * Изображение жанра
             * example:
             * {
             *   "208x208": "http://avatars.mds.yandex.net/get-music-misc/29541/metagenre-other-x208/orig",
             *   "300x300": "http://avatars.mds.yandex.net/get-music-misc/49997/metagenre-other-x300/orig"
             * }
             */
            images: {
                [name: string]: string;
            };
            /**
             * Показывать в меню
             */
            showInMenu: boolean;
            /**
             * Список регионов в которых отображается жанр в списках
             */
            showInRegions?: number[];
            /**
             * Полный заголовок
             */
            fullTitle?: string;
            /**
             * Часть ссылки на жанр для открытия в браузере
             */
            urlPart?: string;
            /**
             * Цвет фона изображения
             */
            color?: string;
            /**
             * Иконка радио жанра
             */
            radioIcon?: Icon;
            /**
             * Поджанры текущего жанра музыки
             */
            subGenres?: Genre;
            /**
             * В каких регионах скрывать жанр
             */
            hideInRegions?: number[];
        }
        export interface Icon {
            backgroundColor: string;
            imageUrl: string;
        }
        export interface InvocationInfo {
            "exec-duration-millis": number;
            hostname: string;
            "req-id": string;
            /**
             * example:
             * music-play-queue
             */
            "app-name"?: string;
        }
        export interface LandingBlock {
            id: string;
            title: string;
            /**
             * the follwing values are allowed or combination of these values separated by comman - personal-playlists, podcasts, play-context, chart, new-playlists, new-releases, promotions
             */
            type: string;
            typeForFrom: LandingBlockType;
            description: string;
            entities: (LandingPodcastItem | LandingBlockItem)[];
        }
        export interface LandingBlockItem {
            id: string;
            type: LandingBlockType;
            data: Album | /* play list data */ Playlist | Promotion | MixLink | GeneratedPlaylistLandingBlock | ChartItem;
        }
        export type LandingBlockType = "personalplaylists" | "promotions" | "new-releases" | "new-playlists" | "mixes" | "chart" | "artists" | "albums" | "playlists" | "play_contexts" | "podcasts";
        export interface LandingPodcastItem {
            type: string;
            description: string;
            descriptionFormatted: string;
            lastUpdated: string;
            data: {
                podcast: Album;
                description: string;
                descriptionFormatted: string;
                lastUpdated: string;
            };
        }
        export interface LandingResult {
            pumpkin: boolean;
            contentId: string;
            blocks: LandingBlock[];
        }
        /**
         * часть текста с ссылкой на лицензионное соглашение
         */
        export interface LicenceTextPart {
            /**
             * Часть текста.
             */
            text?: string;
            /**
             * Ссылка на лицензионное соглашение.
             */
            url?: string;
        }
        /**
         * текст трека
         */
        export interface Lyrics {
            /**
             * Уникальный идентификатор текста трека.
             */
            id?: number;
            /**
             * Первые строки текст песни.
             */
            lyrics?: string;
            /**
             * Есть ли права.
             */
            hasRights?: boolean;
            /**
             * Текст песни.
             */
            fullLyrics?: string;
            /**
             * Язык текста.
             */
            textLanguage?: string;
            /**
             * Доступен ли перевод.
             */
            showTranslation?: boolean;
            /**
             * Ссылка на источник перевода. Обычно genius.com.
             */
            url?: string;
        }
        export interface MenuItem {
            title?: string;
            url?: string;
            selected?: boolean;
        }
        export interface MinMax {
            value: number;
            name: string;
        }
        export interface MixLink {
            title: string;
            url: string;
            urlScheme: string;
            textColor: string;
            backgroundColor: string;
            coverWhite: string;
        }
        export interface NewPlaylistItem {
            /**
             * id пользователя
             */
            uid: number;
            /**
             * id плейлиста
             */
            kind: number;
        }
        export interface Owner {
            login: string;
            name: string;
            sex: string;
            uid: number;
            verified: boolean;
        }
        /**
         * оповещения
         */
        export interface PermissionAlerts {
            alerts?: string[];
        }
        /**
         * Информация о правах пользователя, их изначальных значениях и даты окончания
         */
        export interface Permissions {
            /**
             * example:
             * 2021-03-24T18:13:40+00:00
             */
            until?: string;
            values?: ("landing-play" | "feed-play" | "radio-play" | "mix-play" | "radio-skips" | "play-radio-full-tracks")[];
            default?: ("landing-play" | "feed-play" | "radio-play" | "mix-play" | "radio-skips" | "play-radio-full-tracks")[];
        }
        /**
         * play list data
         */
        export interface Playlist {
            playlistUuid: string;
            description: string;
            descriptionFormatted: string;
            available: boolean;
            collective: boolean;
            cover?: Cover;
            created: string;
            modified: string;
            backgroundColor: string;
            textColor: string;
            durationMs: number;
            isBanner: boolean;
            isPremiere: boolean;
            kind: number;
            ogImage?: string;
            owner: Owner;
            prerolls?: {
                [key: string]: any;
            }[];
            revision: number;
            snapshot: number;
            tags: {
                id?: string;
                value?: string;
            }[];
            title: string;
            trackCount: number;
            uid: number;
            visibility: "public" | "private";
            likesCount: number;
            tracks: TrackItem[];
        }
        export interface PlaylistId {
            /**
             * Уникальный идентификатор пользователя владеющим плейлистом
             */
            uid?: number;
            /**
             * Уникальный идентификатор плейлиста
             */
            kind?: number;
        }
        /**
         * рекомендации для плейлиста
         */
        export interface PlaylistRecommendations {
            /**
             * Уникальный идентификатор партии треков
             */
            batch_id?: string;
            tracks?: Track[];
        }
        /**
         * цена
         */
        export interface Price {
            /**
             * Количество единиц
             */
            amount?: number;
            /**
             * Валюта
             */
            currency?: string;
        }
        /**
         * продаваемый продукт
         */
        export interface Product {
            /**
             * Уникальный идентификатор.
             */
            productId?: string;
            /**
             * Тип продаваемого.
             */
            type?: string;
            /**
             * Длительность общего периода.
             */
            commonPeriodDuration?: string;
            /**
             * Длительность.
             */
            duration?: number;
            /**
             * Длительность испытательного срока.
             */
            trialDuration?: number;
            /**
             * Цена.
             */
            price?: /* цена */ Price;
            /**
             * Предоставляемая возможность.
             */
            feature?: string;
            /**
             * Отладочный продукт.
             */
            debug?: boolean;
            /**
             * Даёт ли подписку "Плюс".
             */
            plus?: boolean;
            /**
             * Самый дешёвый (лучшее предложение).
             */
            cheapest?: boolean;
            /**
             * Заголовок продукта.
             */
            title?: string;
            /**
             * Семейная ли подписка.
             */
            familySub?: boolean;
            /**
             * Картинка для превью на facebook.
             */
            fbImage?: string;
            /**
             * Заголовок превью на facebook.
             */
            fbName?: string;
            /**
             * Доступно ли для семьи.
             */
            family?: boolean;
            /**
             * Список предоставляемых возможностей.
             */
            features?: string[];
            /**
             * Описание.
             */
            description?: string;
            /**
             * Доступна ли покупка.
             */
            available?: boolean;
            /**
             * Доступен ли пробный период.
             */
            trialAvailable?: boolean;
            /**
             * Длительность пробного периода.
             */
            trialPeriodDuration?: string;
            /**
             * Длительность вступительного периода TODO.
             */
            introPeriodDuration?: string;
            /**
             * Цена вступительного периода.
             */
            introPrice?: /* цена */ Price;
            /**
             * Длительность первого срока (за меньшую цену).
             */
            startPeriodDuration?: string;
            /**
             * Цена за первый срок.
             */
            startPrice?: /* цена */ Price;
            /**
             * Длительность пробного периода.
             */
            licenceTextParts?: /* часть текста с ссылкой на лицензионное соглашение */ LicenceTextPart;
            /**
             * Доступен испытательный срок продавца TODO.
             */
            vendorTrialAvailable?: boolean;
            /**
             * Текст кнопки.
             */
            buttonText?: string;
            /**
             * Дополнительный текст кнопки.
             */
            buttonAdditionalText?: string;
            /**
             * Способы оплаты.
             */
            paymentMethodTypes?: string[];
        }
        /**
         * статус активации промо-кода
         */
        export interface PromoCodeStatus {
            /**
             * Статус операции
             * example:
             * code-not-exists
             */
            status?: string;
            /**
             * Описание статуса
             * example:
             * Gift code does not exist
             */
            statusDesc?: string;
            /**
             * Информация об аккаунте пользователя.
             */
            accountStatus?: Status;
        }
        export interface Promotion {
            promoId: string;
            title: string;
            subtitle: string;
            heading: string;
            urlScheme: string;
            url: string;
            textColor: string;
            gradient: string;
            image: string;
        }
        /**
         * Содержимое очереди, на основе чего она построена (плейлист, радио, ...)
         */
        export interface QueueContext {
            /**
             * Уникальный идентификатор типа содержимого (плейлиста, альбома и т.д.). При `type` равным `my_music` или `various` поле `id` отсутствует.
             */
            id?: string;
            /**
             * Описание содержимого (например, название плейлиста, радиостанции) - `various`, `my_music`, `radio`, `playlist`, `artist`. Тип `various` используется при прослушивании из раздела "Моя музыка" с сайта, а `my_music` с мобильных клиентов.
             */
            description?: string;
            /**
             * Тип содержимого, на основе чего построена очередь. Значение есть зачастую только когда `type` имеет значение `my_music` или `various`.
             * example:
             * radio
             */
            type: string;
        }
        /**
         * Очередь треков в списке очередей устройств
         */
        export interface QueueItem {
            /**
             * Уникальный идентификатор очереди
             */
            id: string;
            context: /* Содержимое очереди, на основе чего она построена (плейлист, радио, ...) */ QueueContext;
            modified: string;
            /**
             * Поле присутствует, только при запросе очереди по идентификатору
             */
            tracks?: QueueTrack[];
            /**
             * Поле присутствует, только при запросе очереди по идентификатору
             */
            currentIndex?: number;
        }
        export interface QueueTrack {
            trackId: string;
            albumId: string;
            from: string;
        }
        export interface QueuesResult {
            queues: /* Очередь треков в списке очередей устройств */ QueueItem[];
        }
        export interface RestrictionEnum {
            type: string;
            name: string;
            possibleValues: {
                name: string;
                value: string;
            };
        }
        export interface RestrictionEnum2 {
            type: string;
            name: string;
            possibleValues: {
                name: string;
                value: string;
                imageUrl: string;
                serializedSeed: string;
            };
        }
        /**
         * Ограничения для настроек станции старого формата
         */
        export interface Restrictions {
            language?: RestrictionEnum;
            mood?: /* Класс, представляющий дискретное значение */ DiscreteScale;
            energy?: /* Класс, представляющий дискретное значение */ DiscreteScale;
            diversity?: RestrictionEnum;
        }
        /**
         * Ограничения для настроек станции
         */
        export interface Restrictions2 {
            diversity?: RestrictionEnum2;
            moodEnergy?: RestrictionEnum2;
            language?: RestrictionEnum2;
        }
        export interface RotorData {
            title: string;
            description: string;
            imageUrl: string;
            artists: Artist[];
        }
        export interface RotorSettings {
            language: string;
            diversity: string;
            mood: number;
            energy: number;
        }
        export interface RotorSettings2 {
            language: string;
            diversity: string;
            moodEnergy: string;
        }
        /**
         * Результаты поиска
         */
        export interface Search {
            /**
             * ID запроса
             */
            searchResultId?: string;
            /**
             * Текст запроса
             */
            text: string;
            best: /* лучший результат поиска */ Best;
            /**
             * Найденные альбомы
             */
            albums: {
                /**
                 * Тип результата
                 */
                type: string;
                /**
                 * Количество результатов
                 */
                total: number;
                /**
                 * Максимальное количество результатов на странице.
                 */
                perPage: number;
                /**
                 * Позиция блока
                 */
                order: number;
                results: Album[];
            };
            /**
             * Найденные артисты
             */
            artists: {
                /**
                 * Тип результата
                 */
                type: string;
                /**
                 * Количество результатов
                 */
                total: number;
                /**
                 * Максимальное количество результатов на странице.
                 */
                perPage: number;
                /**
                 * Позиция блока
                 */
                order: number;
                results: Artist[];
            };
            /**
             * Найденные альбомы
             */
            playlists: {
                /**
                 * Тип результата
                 */
                type: string;
                /**
                 * Количество результатов
                 */
                total: number;
                /**
                 * Максимальное количество результатов на странице.
                 */
                perPage: number;
                /**
                 * Позиция блока
                 */
                order: number;
                results: /* play list data */ Playlist[];
            };
            /**
             * Найденные треки
             */
            tracks: {
                /**
                 * Тип результата
                 */
                type: string;
                /**
                 * Количество результатов
                 */
                total: number;
                /**
                 * Максимальное количество результатов на странице.
                 */
                perPage: number;
                /**
                 * Позиция блока
                 */
                order: number;
                results: Track[];
            };
            /**
             * Найденные видео
             */
            videos?: {
                /**
                 * Тип результата
                 */
                type: string;
                /**
                 * Количество результатов
                 */
                total: number;
                /**
                 * Максимальное количество результатов на странице.
                 */
                perPage: number;
                /**
                 * Позиция блока
                 */
                order: number;
                results: /* Видео */ Video[];
            };
            /**
             * Найденные подкасты
             */
            podcasts?: {
                /**
                 * Тип результата
                 */
                type: string;
                /**
                 * Количество результатов
                 */
                total: number;
                /**
                 * Максимальное количество результатов на странице.
                 */
                perPage: number;
                /**
                 * Позиция блока
                 */
                order: number;
                results: {
                    [key: string]: any;
                }[];
            };
            /**
             * Найденные выпуски подкастов
             */
            podcast_episodes: {
                /**
                 * Тип результата
                 */
                type: string;
                /**
                 * Количество результатов
                 */
                total: number;
                /**
                 * Максимальное количество результатов на странице.
                 */
                perPage: number;
                /**
                 * Позиция блока
                 */
                order: number;
                results: {
                    [key: string]: any;
                }[];
            };
            /**
             * Тип результата по которому искали. Доступно, при использовании параметра type.
             */
            type?: SearchType;
            /**
             * Текущая страница. Доступно, при использовании параметра type.
             */
            page?: number;
            /**
             * Результатов на странице. Доступно, при использовании параметра type.
             */
            perPage?: number;
            /**
             * Был ли исправлен запрос
             */
            misspellCorrected: boolean;
            /**
             * Оригинальный запрос
             */
            misspellOriginal?: string;
            /**
             * Было ли отключено исправление результата
             */
            nocorrect: boolean;
        }
        export interface SearchResult {
            /**
             * Тип результата
             */
            type: string;
            /**
             * Количество результатов
             */
            total: number;
            /**
             * Максимальное количество результатов на странице.
             */
            perPage: number;
            /**
             * Позиция блока
             */
            order: number;
        }
        export type SearchType = "artist" | "album" | "track" | "podcast" | "all";
        /**
         * Класс, представляющий звено последовательности радио станции
         */
        export interface SequenceItem {
            type: string;
            track: Track;
            liked: boolean;
            trackParameters: {
                bpm: number;
                hue: number;
                energy: number;
            };
        }
        /**
         * Предложения по покупке
         */
        export interface Settings {
            inAppProducts?: /* продаваемый продукт */ Product[];
            nativeProducts?: /* продаваемый продукт */ Product[];
            webPaymentUrl?: string;
            webPaymentMonthProductPrice?: /* цена */ Price;
            promoCodesEnabled?: boolean;
        }
        /**
         * список похожих треков на другой трек
         */
        export interface SimilarTracks {
            /**
             * трек
             */
            track?: Track;
            /**
             * Похожие треки
             */
            similarTracks?: Track[];
        }
        export interface Station {
            /**
             * Уникальный идентификатор станции
             */
            id: StationId;
            /**
             * Уникальный идентификатор станции, являющейся предком текущей
             */
            parentId?: StationId;
            /**
             * Название станции
             */
            name: string;
            /**
             * Иконка станции
             */
            icon: Icon;
            /**
             * Иконка станции
             */
            mtsIcon: Icon;
            /**
             * Ссылка на полное изображение
             */
            fullImageUrl?: string;
            /**
             * Ссылка на полную иконку
             */
            mtsFullImageUrl?: string;
            /**
             * Категория (тип) станции
             */
            idForFrom?: string;
            /**
             * Ограничения для настроек станции старого формата
             */
            restrictions?: /* Ограничения для настроек станции старого формата */ Restrictions;
            /**
             * Ограничения для настроек станции
             */
            restrictions2?: /* Ограничения для настроек станции */ Restrictions2;
        }
        export interface StationId {
            type: string;
            tag: string;
        }
        export interface StationResult {
            station?: Station;
            data?: RotorData;
            settings?: RotorSettings;
            settings2?: RotorSettings2;
            adParams?: AdParams;
            rupTitle?: string;
            rupDescription?: string;
        }
        export interface StationTracksResult {
            id: {
                type: string;
                tag: string;
            };
            sequence: /* Класс, представляющий звено последовательности радио станции */ SequenceItem[];
            batchId: string;
            pumpkin: boolean;
            radioSessionId: string;
        }
        export interface Status {
            account: /* Основная информация об аккаунте */ Account;
            permissions: /* Информация о правах пользователя, их изначальных значениях и даты окончания */ Permissions;
            subscription: /* Информация о подписках пользователя */ Subscription;
            /**
             * Наличие статуса модератора проверки корректности информации
             */
            subeditor: boolean;
            /**
             * Уровень статуса модератора
             */
            subeditorLevel: number;
            pretrialActive: boolean;
            /**
             * Информация о Plus подписке
             */
            plus: {
                hasPlus?: boolean;
                isTutorialCompleted?: boolean;
                migrated?: boolean;
            };
            /**
             * Основной e-mail адрес аккаунта
             * example:
             * email@example.com
             */
            defaultEmail: string;
            /**
             * Блок с предупреждениями о конце подписки и подарках
             */
            barBelow?: /* Блок с предупреждениями о конце подписки и подарках */ Alert;
            userhash: string;
        }
        /**
         * Информация о подписках пользователя
         */
        export interface Subscription {
            hadAnySubscription?: boolean;
            canStartTrial?: boolean;
            mcdonalds?: boolean;
        }
        /**
         * подсказки при поиске
         */
        export interface Suggestions {
            best?: {
                [key: string]: any;
            };
            suggestions?: string[];
        }
        /**
         * дополнительная информация о треке
         */
        export interface Supplement {
            /**
             * Уникальный идентификатор дополнительной информации.
             */
            id?: number;
            /**
             * Текст песни.
             */
            lyrics?: /* текст трека */ Lyrics;
            /**
             * Видео.
             */
            videos?: /* видеоклипы */ VideoSupplement;
            /**
             * Доступно ли радио.
             */
            radioIsAvailable?: boolean;
            /**
             * Полное описание эпизода подкаста.
             */
            description?: string;
        }
        /**
         * Тег
         */
        export interface Tag {
            /**
             * Уникальный идентификатор тега
             */
            id: string;
            /**
             * Значение тега (название в lower case)
             */
            value: string;
            /**
             * Название тега (отображаемое)
             */
            name: string;
            /**
             * Описание тега для OpenGraph
             */
            ogDescription: string;
            /**
             * Ссылка на изображение для OpenGraph
             */
            ogImage?: string;
        }
        /**
         * Класс, представляющий тег и его плейлисты
         */
        export interface TagResult {
            tag?: /* Тег */ Tag;
            ids?: PlaylistId[];
        }
        export interface Track {
            albums: Album[];
            artists: Artist[];
            available: boolean;
            availableForPremiumUsers: boolean;
            availableFullWithoutPermission: boolean;
            /**
             * Cover uri template
             */
            coverUri: string;
            durationMs: number;
            fileSize: number;
            id: string;
            lyricsAvailable: boolean;
            major: {
                id: number;
                name: string;
            };
            normalization: {
                gain: number;
                peak: number;
            };
            ogImage: string;
            previewDurationMs: number;
            realId: string;
            rememberPosition: boolean;
            storageDir: string;
            title: string;
            type: string;
        }
        /**
         * информация о вариантах загрузки трека
         */
        export interface TrackDownloadInfo {
            /**
             * Кодек аудиофайла
             */
            codec: "mp3" | "aac";
            /**
             * Усиление
             */
            gain: boolean;
            /**
             * Предварительный просмотр
             */
            preview: string;
            /**
             * Ссылка на XML документ содержащий данные для загрузки трека
             */
            downloadInfoUrl: string;
            /**
             * Прямая ли ссылка
             */
            direct: boolean;
            /**
             * Битрейт аудиофайла в кбит/с
             */
            bitrateInKbps: number;
        }
        export interface TrackItem {
            id: number;
            playCount: number;
            recent: boolean;
            timestamp: string;
            /**
             * Null when tracks are not riched
             */
            track?: Track;
        }
        /**
         * Укороченная версия трека с неполными данными
         */
        export interface TrackShort {
            /**
             * Уникальный идентификатор трека
             */
            id: string;
            /**
             * Уникальный идентификатор альбома
             */
            albumId: string;
            /**
             * Дата
             */
            timestamp: string;
        }
        /**
         * список треков
         */
        export interface TracksList {
            /**
             * Уникальный идентификатор пользователя
             */
            uid: number;
            /**
             * Актуальность данных TODO
             */
            revisions: number;
            /**
             * Список треков в укороченной версии
             */
            tracks: /* Укороченная версия трека с неполными данными */ TrackShort[];
        }
        export interface UpdateQueueResult {
            status: string;
            mostRecentQueue: string;
        }
        export interface UserSettings {
            uid?: number;
            /**
             * example:
             * false
             */
            lastFmScrobblingEnabled?: boolean;
            /**
             * example:
             * false
             */
            facebookScrobblingEnabled?: boolean;
            /**
             * example:
             * false
             */
            shuffleEnabled?: boolean;
            /**
             * example:
             * false
             */
            addNewTrackOnPlaylistTop?: boolean;
            /**
             * example:
             * 75
             */
            volumePercents?: boolean;
            userMusicVisibility?: /**
             * example:
             * public
             */
            VisibilityEnum;
            userSocialVisibility?: /**
             * example:
             * public
             */
            VisibilityEnum;
            /**
             * example:
             * true
             */
            adsDisabled?: boolean;
            /**
             * example:
             * 2019-04-14T14:55:50+00:00
             */
            modified?: string;
            rbtDisabled?: string;
            /**
             * Тема оформления.
             * example:
             * black
             */
            theme?: "black" | "default";
            /**
             * example:
             * true
             */
            promosDisabled?: boolean;
            /**
             * example:
             * true
             */
            autoPlayRadio?: boolean;
            /**
             * example:
             * false
             */
            syncQueueEnabled?: boolean;
        }
        /**
         * Видео
         */
        export interface Video {
            /**
             * Название видео
             */
            title?: string;
            /**
             * Ссылка на изображение
             */
            cover?: string;
            /**
             * Ссылка на видео
             */
            embedUrl?: string;
            /**
             * Сервис поставляющий видео
             */
            provider?: string;
            /**
             * Уникальный идентификатор видео на сервисе.
             */
            providerVideoId?: string;
            /**
             * Ссылка на видео Youtube
             */
            youtubeUrl?: string;
            /**
             * Ссылка на изображение
             */
            thumbnailUrl?: string;
            /**
             * Длительность видео в секундах
             */
            duration?: number;
            /**
             * Текст
             */
            text?: string;
            /**
             * HTML тег для встраивания в разметку страницы
             */
            htmlAutoPlayVideoPlayer?: string;
            /**
             * example:
             * [
             *   "RUSSIA_PREMIUM",
             *   "RUSSIA"
             * ]
             */
            regions?: string[];
        }
        /**
         * видеоклипы
         */
        export interface VideoSupplement {
            /**
             * URL на обложку видео.
             */
            cover?: string;
            /**
             * Сервис поставляющий видео.
             */
            provider?: string;
            /**
             * Название видео.
             */
            title?: string;
            /**
             * Уникальный идентификатор видео на сервисе.
             */
            providerVideoId?: string;
            /**
             * URL на видео.
             */
            url?: string;
            /**
             * URL на видео, находящегося на серверах Яндекса.
             */
            embedUrl?: string;
            /**
             * HTML тег для встраивания видео.
             */
            embed?: string;
        }
        /**
         * example:
         * public
         */
        export type VisibilityEnum = "private" | "public";
    }
}
declare namespace Paths {
    namespace ActivatePromoCode {
        export interface RequestBody {
            code?: string;
            /**
             * example:
             * en
             */
            language?: string;
        }
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* статус активации промо-кода */ Components.Schemas.PromoCodeStatus;
            }
        }
    }
    namespace Albums$AlbumId {
        namespace Parameters {
            export type AlbumId = number;
        }
        export interface PathParameters {
            albumId: Parameters.AlbumId;
        }
    }
    namespace Albums$AlbumIdWithTracks {
        namespace Parameters {
            export type AlbumId = number;
        }
        export interface PathParameters {
            albumId: Parameters.AlbumId;
        }
    }
    namespace Artists$ArtistIdBriefInfo {
        namespace Parameters {
            /**
             * example:
             * 218099
             */
            export type ArtistId = string;
        }
        export interface PathParameters {
            artistId: /**
             * example:
             * 218099
             */
            Parameters.ArtistId;
        }
    }
    namespace Artists$ArtistIdDirectAlbums {
        namespace Parameters {
            /**
             * example:
             * 218099
             */
            export type ArtistId = string;
            /**
             * example:
             * 0
             */
            export type Page = number;
            /**
             * example:
             * 20
             */
            export type PageSize = number;
            export type SortBy = "year" | "rating";
        }
        export interface PathParameters {
            artistId: /**
             * example:
             * 218099
             */
            Parameters.ArtistId;
        }
        export interface QueryParameters {
            page?: /**
             * example:
             * 0
             */
            Parameters.Page;
            "page-size"?: /**
             * example:
             * 20
             */
            Parameters.PageSize;
            "sort-by"?: Parameters.SortBy;
        }
    }
    namespace Artists$ArtistIdTrackIdsByRating {
        namespace Parameters {
            /**
             * example:
             * 218099
             */
            export type ArtistId = string;
        }
        export interface PathParameters {
            artistId: /**
             * example:
             * 218099
             */
            Parameters.ArtistId;
        }
    }
    namespace Artists$ArtistIdTracks {
        namespace Parameters {
            /**
             * example:
             * 218099
             */
            export type ArtistId = string;
            /**
             * example:
             * 0
             */
            export type Page = number;
            /**
             * example:
             * 20
             */
            export type PageSize = number;
        }
        export interface PathParameters {
            artistId: /**
             * example:
             * 218099
             */
            Parameters.ArtistId;
        }
        export interface QueryParameters {
            page?: /**
             * example:
             * 0
             */
            Parameters.Page;
            "page-size"?: /**
             * example:
             * 20
             */
            Parameters.PageSize;
        }
    }
    namespace ChangeAccountSettings {
        /**
         * Словарь параметров и значений
         * example:
         * {
         *   "theme": "black",
         *   "volumePercents": 80,
         *   "adsDisabled": true
         * }
         */
        export interface RequestBody {
            [name: string]: any;
        }
        namespace Responses {
            /**
             * Настройки пользователя или "None"
             */
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.UserSettings | {
                    [key: string]: any;
                };
            }
            export type $400 = Components.Schemas.BadRequest;
        }
    }
    namespace ChangePlaylistTracks {
        export interface RequestBody {
            diff?: string;
            /**
             * example:
             * 0
             */
            revision?: string;
        }
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* play list data */ Components.Schemas.Playlist;
            }
            export interface $412 {
                name?: string;
                message?: string;
            }
        }
    }
    namespace ChangePlaylistVisibility {
        export interface RequestBody {
            value?: /**
             * example:
             * public
             */
            Components.Schemas.VisibilityEnum;
        }
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* play list data */ Components.Schemas.Playlist;
            }
            export type $400 = Components.Schemas.BadRequest;
        }
    }
    namespace CreatePlaylist {
        export interface RequestBody {
            title: string;
            visibility: /**
             * example:
             * public
             */
            Components.Schemas.VisibilityEnum;
        }
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* play list data */ Components.Schemas.Playlist;
            }
            export type $400 = Components.Schemas.BadRequest;
            export interface $401 {
            }
        }
    }
    namespace DeletePlaylist {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: string;
            }
        }
    }
    namespace FeedWizardIsPassed {
        namespace Get {
            namespace Responses {
                export interface $200 {
                    invocationInfo: Components.Schemas.InvocationInfo;
                    result: {
                        /**
                         * example:
                         * true
                         */
                        isWizardPassed?: boolean;
                    };
                }
            }
        }
    }
    namespace GetAccountExperiments {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* режимы экспериментальных функций */ Components.Schemas.Experiments;
            }
        }
    }
    namespace GetAccountSettings {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.UserSettings;
            }
        }
    }
    namespace GetAccountStatus {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.Status;
            }
            export type $400 = Components.Schemas.BadRequest;
        }
    }
    namespace GetAlbumById {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.Album;
            }
        }
    }
    namespace GetAlbumsByIds {
        export interface RequestBody {
            /**
             * example:
             * 18837614,23899279,23754447,21808509,23529901,22231572,10935745,23342620,23190604,23240656
             */
            "album-ids": string;
        }
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.Album[];
            }
        }
    }
    namespace GetAlbumsWithTracks {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.Album;
            }
        }
    }
    namespace GetBooksAndPodcasts {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* Блоки главной страницы кнги и подкастов */ Components.Schemas.BooksAndPodcastsResult;
            }
        }
    }
    namespace GetChart {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.FullChartResult;
            }
        }
    }
    namespace GetDislikedTracksIds {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* список треков */ Components.Schemas.TracksList;
            }
        }
    }
    namespace GetDownloadInfo {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* информация о вариантах загрузки трека */ Components.Schemas.TrackDownloadInfo[];
            }
        }
    }
    namespace GetFeed {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: {
                    canGetMoreEvents: boolean;
                    days: {
                        [key: string]: any;
                    }[];
                    generatedPlaylists: Components.Schemas.GeneratedPlaylistLandingBlock[];
                    headlines: {
                        [key: string]: any;
                    }[];
                    isWizardPassed: boolean;
                    pumpkin: boolean;
                    today: string;
                };
            }
        }
    }
    namespace GetGenres {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.Genre[];
            }
        }
    }
    namespace GetLandingBlock {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace GetLandingBlocks {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.LandingResult;
            }
        }
    }
    namespace GetLikedTracksIds {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: {
                    library: /* список треков */ Components.Schemas.TracksList;
                };
            }
            export interface $404 {
                invocationInfo?: Components.Schemas.InvocationInfo;
                result?: {
                    name?: string;
                    message?: string;
                };
            }
        }
    }
    namespace GetNewPlaylists {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: {
                    id: string;
                    type: "new-playlists";
                    typeForFrom: string;
                    title: string;
                    newPlaylists: Components.Schemas.NewPlaylistItem[];
                };
            }
        }
    }
    namespace GetNewPodcasts {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: {
                    type: "non-music_main_podcasts";
                    typeForFrom: string;
                    title: string;
                    podcasts: number[];
                };
            }
        }
    }
    namespace GetNewReleases {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: {
                    id: string;
                    type: "new-releases";
                    typeForFrom: string;
                    title: string;
                    newReleases: number[];
                };
            }
        }
    }
    namespace GetPermissionAlerts {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* оповещения */ Components.Schemas.PermissionAlerts;
            }
        }
    }
    namespace GetPlayLists {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* play list data */ Components.Schemas.Playlist[];
            }
        }
    }
    namespace GetPlaylistById {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* play list data */ Components.Schemas.Playlist;
            }
        }
    }
    namespace GetPlaylistsByIds {
        export interface RequestBody {
            /**
             * uid владельца плейлиста и kind плейлиста через двоеточие и запятую
             * example:
             * [
             *   "103372440:1878",
             *   "460140864:1000"
             * ]
             */
            playlistIds?: string[];
        }
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* play list data */ Components.Schemas.Playlist[];
            }
            export type $400 = Components.Schemas.BadRequest;
        }
    }
    namespace GetPlaylistsIdsByTag {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* Класс, представляющий тег и его плейлисты */ Components.Schemas.TagResult;
            }
        }
    }
    namespace GetPopularTracks {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: {
                    artist: Components.Schemas.Artist;
                    tracks: string[];
                };
            }
        }
    }
    namespace GetQueueById {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* Очередь треков в списке очередей устройств */ Components.Schemas.QueueItem;
            }
        }
    }
    namespace GetQueues {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.QueuesResult;
            }
        }
    }
    namespace GetRecommendations {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* рекомендации для плейлиста */ Components.Schemas.PlaylistRecommendations;
            }
        }
    }
    namespace GetRotorStationsDashboard {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.Dashboard[];
            }
        }
    }
    namespace GetSettings {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* Предложения по покупке */ Components.Schemas.Settings;
            }
        }
    }
    namespace GetSimilarTracks {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* список похожих треков на другой трек */ Components.Schemas.SimilarTracks;
            }
        }
    }
    namespace GetStationInfo {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.Station[];
            }
        }
    }
    namespace GetStationTracks {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.StationTracksResult;
            }
            export type $400 = Components.Schemas.BadRequest;
        }
    }
    namespace GetStationsList {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.StationResult[];
            }
        }
    }
    namespace GetToken {
        export interface RequestBody {
            grant_type: "password";
            client_id: "23cabbbdc6cd418abb4b39c32c41195d";
            client_secret: "53bc75238f0c4d08a118e51fe9203300";
            username: string;
            password: string;
        }
        namespace Responses {
            export interface $200 {
                access_token: string;
                expires_in: number;
                token_type: string;
                uid: number;
            }
        }
    }
    namespace GetTrackLyrics {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: {
                    [key: string]: any;
                };
            }
        }
    }
    namespace GetTrackSupplement {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* дополнительная информация о треке */ Components.Schemas.Supplement;
            }
        }
    }
    namespace GetTracks {
        export interface RequestBody {
            /**
             * Уникальные идентификаторы треков
             * example:
             * [
             *   7019818,
             *   29238706
             * ]
             */
            "track-ids"?: string[];
            /**
             * С позициями
             * example:
             * false
             */
            "with-positions"?: boolean;
        }
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.Track[];
            }
            export type $400 = Components.Schemas.BadRequest;
        }
    }
    namespace GetUserPlaylistsByIds {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* play list data */ Components.Schemas.Playlist[];
            }
        }
    }
    namespace Landing3 {
        namespace Parameters {
            /**
             * Одно или несколько значений блоков, разделенных запятой "promotions","new-releases","new-playlists","mixes","chart","playlists","play_contexts","podcasts"
             */
            export type Blocks = string;
        }
        export interface QueryParameters {
            blocks?: /* Одно или несколько значений блоков, разделенных запятой "promotions","new-releases","new-playlists","mixes","chart","playlists","play_contexts","podcasts" */ Parameters.Blocks;
        }
    }
    namespace Landing3$LandingBlock {
        namespace Parameters {
            export type LandingBlock = "new-playlists" | "new-releases" | "chart" | "podcasts";
        }
        export interface PathParameters {
            landingBlock: Parameters.LandingBlock;
        }
    }
    namespace Landing3Chart$ChartType {
        namespace Parameters {
            export type ChartType = "russia" | "world";
        }
        export interface PathParameters {
            chartType: Parameters.ChartType;
        }
    }
    namespace LikeTracks {
        export interface RequestBody {
            /**
             * example:
             * [
             *   7019818,
             *   29238706,
             *   83063895
             * ]
             */
            "track-ids"?: string[];
        }
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: {
                    revision?: number;
                };
            }
        }
    }
    namespace PlayAudio {
        export interface RequestBody {
            /**
             * Уникальный идентификатор трека
             */
            "track-id"?: string;
            /**
             * Проигрывается ли трек из кеша
             */
            "from-cache"?: boolean;
            /**
             * Наименования клиента с которого происходит прослушивание
             */
            from: string;
            /**
             * Уникальный идентификатор проигрывания
             */
            "play-id"?: string;
            /**
             * Уникальный идентификатор пользователя
             */
            uid?: number;
            /**
             * Текущая дата и время в ISO
             * example:
             * 2021-03-17T18:13:40.000+00:00
             */
            timestamp?: string;
            /**
             * Продолжительность трека в секундах
             */
            "track-length-seconds"?: number;
            /**
             * Продолжительность трека в секундах
             */
            "total-played-seconds"?: number;
            /**
             * Продолжительность трека в секундах
             */
            "end-position-seconds"?: number;
            /**
             * Уникальный идентификатор альбома
             */
            "album-id"?: string;
            /**
             * Уникальный идентификатор проигрывания
             */
            "playlist-id"?: string;
            /**
             * Текущая дата и время клиента в ISO
             * example:
             * 2021-03-17T18:13:40.000+00:00
             */
            "client-now"?: string;
        }
        namespace Responses {
            /**
             * Возвращает строку "ok" при успешном выполнении запроса
             */
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                /**
                 * example:
                 * ok
                 */
                result: string;
            }
            export type $400 = Components.Schemas.BadRequest;
        }
    }
    namespace Queues {
        export interface HeaderParameters {
            "X-Yandex-Music-Device": /**
             * example:
             * os=unknown; os_version=unknown; manufacturer=unknown; model=unknown; clid=; device_id=unknown; uuid=unknown
             */
            Parameters.XYandexMusicDevice;
        }
        namespace Parameters {
            /**
             * example:
             * os=unknown; os_version=unknown; manufacturer=unknown; model=unknown; clid=; device_id=unknown; uuid=unknown
             */
            export type XYandexMusicDevice = string;
        }
    }
    namespace Queues$QueueId {
        namespace Parameters {
            export type QueueId = string;
        }
        export interface PathParameters {
            queueId: Parameters.QueueId;
        }
    }
    namespace Queues$QueueIdUpdatePosition {
        namespace Parameters {
            export type CurrentIndex = string;
            export type IsInteractive = boolean;
            export type QueueId = string;
        }
        export interface PathParameters {
            queueId: Parameters.QueueId;
        }
        export interface QueryParameters {
            currentIndex: Parameters.CurrentIndex;
            IsInteractive: Parameters.IsInteractive;
        }
    }
    namespace RemoveLikedTracks {
        export interface RequestBody {
            /**
             * example:
             * [
             *   7019818,
             *   29238706,
             *   83063895
             * ]
             */
            "track-ids"?: string[];
        }
    }
    namespace RenamePlaylist {
        export interface RequestBody {
            /**
             * example:
             * new-name
             */
            value?: string;
        }
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* play list data */ Components.Schemas.Playlist;
            }
        }
    }
    namespace RotorAccountStatus {
        namespace Get {
            namespace Responses {
                export type $400 = Components.Schemas.BadRequest;
            }
        }
    }
    namespace RotorStation$StationIdFeedback {
        namespace Parameters {
            export type StationId = string;
        }
        export interface PathParameters {
            stationId: Parameters.StationId;
        }
    }
    namespace RotorStation$StationIdInfo {
        namespace Parameters {
            /**
             * example:
             * user:onyourwave
             */
            export type StationId = string;
        }
        export interface PathParameters {
            stationId: /**
             * example:
             * user:onyourwave
             */
            Parameters.StationId;
        }
    }
    namespace RotorStation$StationIdTracks {
        namespace Parameters {
            export type Queue = string;
            /**
             * example:
             * true
             */
            export type Settings2 = boolean;
            /**
             * example:
             * user:onyourwave
             */
            export type StationId = string;
        }
        export interface PathParameters {
            stationId: /**
             * example:
             * user:onyourwave
             */
            Parameters.StationId;
        }
        export interface QueryParameters {
            settings2?: /**
             * example:
             * true
             */
            Parameters.Settings2;
            queue?: Parameters.Queue;
        }
    }
    namespace RotorStationsList {
        namespace Parameters {
            /**
             * example:
             * ru
             */
            export type Language = string;
        }
        export interface QueryParameters {
            language?: /**
             * example:
             * ru
             */
            Parameters.Language;
        }
    }
    namespace Search {
        namespace Parameters {
            export type Nococrrect = boolean;
            /**
             * example:
             * 0
             */
            export type Page = number;
            /**
             * example:
             * Король и Шут
             */
            export type Text = string;
            export type Type = Components.Schemas.SearchType;
        }
        export interface QueryParameters {
            text: /**
             * example:
             * Король и Шут
             */
            Parameters.Text;
            page: /**
             * example:
             * 0
             */
            Parameters.Page;
            type: Parameters.Type;
            nococrrect?: Parameters.Nococrrect;
        }
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: /* Результаты поиска */ Components.Schemas.Search;
            }
        }
    }
    namespace SearchSuggest {
        namespace Get {
            namespace Responses {
                export interface $200 {
                    invocationInfo: Components.Schemas.InvocationInfo;
                    result: /* подсказки при поиске */ Components.Schemas.Suggestions;
                }
            }
        }
        namespace Parameters {
            /**
             * example:
             * Король
             */
            export type Part = string;
        }
        export interface QueryParameters {
            part: /**
             * example:
             * Король
             */
            Parameters.Part;
        }
    }
    namespace SendStationFeedback {
        namespace Parameters {
            export type BatchId = string;
        }
        export interface QueryParameters {
            "batch-id"?: Parameters.BatchId;
        }
        export interface RequestBody {
            /**
             * Тип отправляемого фидбека
             */
            type: "radioStarted" | "trackStarted" | "trackFinished" | "skip";
            /**
             * Текущее время и дата
             * example:
             * 2023-02-26T09:41:23
             */
            timestamp?: string;
            /**
             * Откуда начато воспроизведение радио
             * example:
             * mobile-radio-user-onyourwave
             */
            from?: string;
            /**
             * Уникальной идентификатор трека
             * example:
             * 56157695:8288161
             */
            trackId?: string;
            /**
             * Сколько было проиграно секунд трека. Необходимо указывать только для типов 'trackFinished' и 'skip'
             */
            totalPlayedSeconds?: number;
        }
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                /**
                 * ok
                 */
                result: string;
            }
        }
    }
    namespace Tags$TagIdPlaylistIds {
        namespace Parameters {
            export type TagId = string;
        }
        export interface PathParameters {
            tagId: Parameters.TagId;
        }
    }
    namespace Tracks$TrackIdDownloadInfo {
        namespace Parameters {
            /**
             * example:
             * 78550148
             */
            export type TrackId = string;
        }
        export interface PathParameters {
            trackId: /**
             * example:
             * 78550148
             */
            Parameters.TrackId;
        }
    }
    namespace Tracks$TrackIdLyrics {
        namespace Parameters {
            export type Format = string;
            export type Sign = string;
            export type TimeStamp = string;
            export type TrackId = string;
        }
        export interface PathParameters {
            trackId: Parameters.TrackId;
        }
        export interface QueryParameters {
            format?: Parameters.Format;
            timeStamp?: Parameters.TimeStamp;
            sign?: Parameters.Sign;
        }
    }
    namespace Tracks$TrackIdSimilar {
        namespace Parameters {
            /**
             * example:
             * 32326555
             */
            export type TrackId = string;
        }
        export interface PathParameters {
            trackId: /**
             * example:
             * 32326555
             */
            Parameters.TrackId;
        }
    }
    namespace Tracks$TrackIdSupplement {
        namespace Parameters {
            /**
             * example:
             * 32326555
             */
            export type TrackId = string;
        }
        export interface PathParameters {
            trackId: /**
             * example:
             * 32326555
             */
            Parameters.TrackId;
        }
    }
    namespace UpdateQueuePosition {
        namespace Responses {
            export interface $200 {
                invocationInfo: Components.Schemas.InvocationInfo;
                result: Components.Schemas.UpdateQueueResult;
            }
        }
    }
    namespace Users$UserIdDislikesTracks {
        namespace Parameters {
            export type IfModifiedSinceRevision = number;
            /**
             * example:
             * 541320800
             */
            export type UserId = number;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 541320800
             */
            Parameters.UserId;
        }
        export interface QueryParameters {
            if_modified_since_revision?: Parameters.IfModifiedSinceRevision;
        }
    }
    namespace Users$UserIdLikesTracks {
        namespace Parameters {
            /**
             * example:
             * 541320800
             */
            export type UserId = number;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 541320800
             */
            Parameters.UserId;
        }
    }
    namespace Users$UserIdLikesTracksAddMultiple {
        namespace Parameters {
            /**
             * example:
             * 541320800
             */
            export type UserId = number;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 541320800
             */
            Parameters.UserId;
        }
    }
    namespace Users$UserIdLikesTracksRemove {
        namespace Parameters {
            /**
             * example:
             * 541320800
             */
            export type UserId = number;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 541320800
             */
            Parameters.UserId;
        }
    }
    namespace Users$UserIdPlaylists {
        namespace Parameters {
            /**
             * example:
             * 1000,1003
             */
            export type Kinds = string;
            /**
             * example:
             * false
             */
            export type Mixed = boolean;
            /**
             * example:
             * false
             */
            export type RichTracks = boolean;
            /**
             * example:
             * 541320800
             */
            export type UserId = number;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 541320800
             */
            Parameters.UserId;
        }
        export interface QueryParameters {
            kinds: /**
             * example:
             * 1000,1003
             */
            Parameters.Kinds;
            mixed: /**
             * example:
             * false
             */
            Parameters.Mixed;
            "rich-tracks": /**
             * example:
             * false
             */
            Parameters.RichTracks;
        }
    }
    namespace Users$UserIdPlaylists$Kind {
        namespace Parameters {
            /**
             * example:
             * 1000
             */
            export type Kind = number;
            /**
             * example:
             * 541320800
             */
            export type UserId = number;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 541320800
             */
            Parameters.UserId;
            kind: /**
             * example:
             * 1000
             */
            Parameters.Kind;
        }
    }
    namespace Users$UserIdPlaylists$KindChangeRelative {
        namespace Parameters {
            /**
             * example:
             * 1000
             */
            export type Kind = number;
            /**
             * example:
             * 541320800
             */
            export type UserId = number;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 541320800
             */
            Parameters.UserId;
            kind: /**
             * example:
             * 1000
             */
            Parameters.Kind;
        }
    }
    namespace Users$UserIdPlaylists$KindDelete {
        namespace Parameters {
            /**
             * example:
             * 1000
             */
            export type Kind = number;
            /**
             * example:
             * 541320800
             */
            export type UserId = number;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 541320800
             */
            Parameters.UserId;
            kind: /**
             * example:
             * 1000
             */
            Parameters.Kind;
        }
    }
    namespace Users$UserIdPlaylists$KindName {
        namespace Parameters {
            /**
             * example:
             * 1000
             */
            export type Kind = number;
            /**
             * example:
             * 541320800
             */
            export type UserId = number;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 541320800
             */
            Parameters.UserId;
            kind: /**
             * example:
             * 1000
             */
            Parameters.Kind;
        }
    }
    namespace Users$UserIdPlaylists$KindRecommendations {
        namespace Parameters {
            /**
             * example:
             * 1000
             */
            export type Kind = number;
            /**
             * example:
             * 541320800
             */
            export type UserId = number;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 541320800
             */
            Parameters.UserId;
            kind: /**
             * example:
             * 1000
             */
            Parameters.Kind;
        }
    }
    namespace Users$UserIdPlaylists$KindVisibility {
        namespace Parameters {
            /**
             * example:
             * 1000
             */
            export type Kind = number;
            /**
             * example:
             * 541320800
             */
            export type UserId = number;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 541320800
             */
            Parameters.UserId;
            kind: /**
             * example:
             * 1000
             */
            Parameters.Kind;
        }
    }
    namespace Users$UserIdPlaylistsCreate {
        namespace Parameters {
            /**
             * example:
             * 541320800
             */
            export type UserId = number;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 541320800
             */
            Parameters.UserId;
        }
    }
    namespace Users$UserIdPlaylistsList {
        namespace Parameters {
            /**
             * example:
             * 541320800
             */
            export type UserId = number;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 541320800
             */
            Parameters.UserId;
        }
    }
}

export interface OperationMethods {
  /**
   * getToken - Получение токена по логину и паролю
   */
  'getToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GetToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetToken.Responses.$200>
  /**
   * getSettings
   */
  'getSettings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSettings.Responses.$200>
  /**
   * getPermissionAlerts
   */
  'getPermissionAlerts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPermissionAlerts.Responses.$200>
  /**
   * getAccountExperiments
   */
  'getAccountExperiments'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAccountExperiments.Responses.$200>
  /**
   * activatePromoCode
   */
  'activatePromoCode'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ActivatePromoCode.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ActivatePromoCode.Responses.$200>
  /**
   * getAccountSettings - Получение настроек текущего пользователя
   */
  'getAccountSettings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAccountSettings.Responses.$200>
  /**
   * changeAccountSettings - Изменение настроек текущего пользователя
   */
  'changeAccountSettings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ChangeAccountSettings.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangeAccountSettings.Responses.$200>
  /**
   * getAccountStatus
   */
  'getAccountStatus'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAccountStatus.Responses.$200>
  /**
   * getFeed
   */
  'getFeed'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFeed.Responses.$200>
  /**
   * getPlaylistsIdsByTag
   */
  'getPlaylistsIdsByTag'(
    parameters?: Parameters<Paths.Tags$TagIdPlaylistIds.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPlaylistsIdsByTag.Responses.$200>
  /**
   * getAlbumById - Получение альбома по идентификатору
   */
  'getAlbumById'(
    parameters?: Parameters<Paths.Albums$AlbumId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAlbumById.Responses.$200>
  /**
   * getAlbumsWithTracks - Получение альбома с треками
   */
  'getAlbumsWithTracks'(
    parameters?: Parameters<Paths.Albums$AlbumIdWithTracks.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAlbumsWithTracks.Responses.$200>
  /**
   * getAlbumsByIds - Получение альбомов по идентификаторам
   */
  'getAlbumsByIds'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GetAlbumsByIds.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAlbumsByIds.Responses.$200>
  /**
   * getLandingBlocks
   */
  'getLandingBlocks'(
    parameters?: Parameters<Paths.Landing3.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLandingBlocks.Responses.$200>
  /**
   * getLandingBlock
   */
  'getLandingBlock'(
    parameters?: Parameters<Paths.Landing3$LandingBlock.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLandingBlock.Responses.$200>
  /**
   * getNewReleases
   */
  'getNewReleases'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNewReleases.Responses.$200>
  /**
   * getNewPodcasts
   */
  'getNewPodcasts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNewPodcasts.Responses.$200>
  /**
   * getNewPlaylists
   */
  'getNewPlaylists'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNewPlaylists.Responses.$200>
  /**
   * getChart
   */
  'getChart'(
    parameters?: Parameters<Paths.Landing3Chart$ChartType.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetChart.Responses.$200>
  /**
   * getGenres
   */
  'getGenres'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGenres.Responses.$200>
  /**
   * getPlaylistsByIds - Получение полной информации о плейлистах по их идентификатору
   */
  'getPlaylistsByIds'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GetPlaylistsByIds.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPlaylistsByIds.Responses.$200>
  /**
   * getPlayLists - Получение списка плейлистов пользователя.
   */
  'getPlayLists'(
    parameters?: Parameters<Paths.Users$UserIdPlaylistsList.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPlayLists.Responses.$200>
  /**
   * getDislikedTracksIds - Получение треков с отметкой "Не рекомендовать"
   */
  'getDislikedTracksIds'(
    parameters?: Parameters<Paths.Users$UserIdDislikesTracks.QueryParameters & Paths.Users$UserIdDislikesTracks.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDislikedTracksIds.Responses.$200>
  /**
   * search - Осуществление поиска по запросу и типу, получение результатов
   */
  'search'(
    parameters?: Parameters<Paths.Search.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Search.Responses.$200>
  /**
   * getPlaylistById - Получение плейлиста по уникальному идентификатору
   */
  'getPlaylistById'(
    parameters?: Parameters<Paths.Users$UserIdPlaylists$Kind.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPlaylistById.Responses.$200>
  /**
   * getUserPlaylistsByIds - Получение плейлистов по идентификаторам
   */
  'getUserPlaylistsByIds'(
    parameters?: Parameters<Paths.Users$UserIdPlaylists.QueryParameters & Paths.Users$UserIdPlaylists.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserPlaylistsByIds.Responses.$200>
  /**
   * createPlaylist - Создание нового плейлиста
   */
  'createPlaylist'(
    parameters?: Parameters<Paths.Users$UserIdPlaylistsCreate.PathParameters> | null,
    data?: Paths.CreatePlaylist.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePlaylist.Responses.$200>
  /**
   * renamePlaylist - Изменение названия плейлиста.
   */
  'renamePlaylist'(
    parameters?: Parameters<Paths.Users$UserIdPlaylists$KindName.PathParameters> | null,
    data?: Paths.RenamePlaylist.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RenamePlaylist.Responses.$200>
  /**
   * deletePlaylist - Удаление плейлиста
   */
  'deletePlaylist'(
    parameters?: Parameters<Paths.Users$UserIdPlaylists$KindDelete.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeletePlaylist.Responses.$200>
  /**
   * changePlaylistTracks - Добавление треков в плейлист
   * 
   * Используй '{"diff":{"op":"insert","at":0,"tracks":[{"id":"20599729","albumId":"2347459"}]}}' - для добавления, {"diff":{"op":"delete","from":0,"to":1,"tracks":[{"id":"20599729","albumId":"2347459"}]}} - для удаления треков
   */
  'changePlaylistTracks'(
    parameters?: Parameters<Paths.Users$UserIdPlaylists$KindChangeRelative.PathParameters> | null,
    data?: Paths.ChangePlaylistTracks.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangePlaylistTracks.Responses.$200>
  /**
   * getRecommendations - Получение рекомендаций для плейлиста
   */
  'getRecommendations'(
    parameters?: Parameters<Paths.Users$UserIdPlaylists$KindRecommendations.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRecommendations.Responses.$200>
  /**
   * changePlaylistVisibility - Изменение видимости плейлиста
   * 
   * Необходимо передать "public" или "private" в качестве значения
   */
  'changePlaylistVisibility'(
    parameters?: Parameters<Paths.Users$UserIdPlaylists$KindVisibility.PathParameters> | null,
    data?: Paths.ChangePlaylistVisibility.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangePlaylistVisibility.Responses.$200>
  /**
   * likeTracks - Пометить треки как "Мне нравится"
   */
  'likeTracks'(
    parameters?: Parameters<Paths.Users$UserIdLikesTracksAddMultiple.PathParameters> | null,
    data?: Paths.LikeTracks.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LikeTracks.Responses.$200>
  /**
   * removeLikedTracks - Удаление треков из списка "Мне нравится"
   */
  'removeLikedTracks'(
    parameters?: Parameters<Paths.Users$UserIdLikesTracksRemove.PathParameters> | null,
    data?: Paths.RemoveLikedTracks.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * getLikedTracksIds - Получение треков с отметкой "Мне нравится"
   */
  'getLikedTracksIds'(
    parameters?: Parameters<Paths.Users$UserIdLikesTracks.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLikedTracksIds.Responses.$200>
  /**
   * getTracks - Получение треков
   */
  'getTracks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GetTracks.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTracks.Responses.$200>
  /**
   * getDownloadInfo - Получение информации о доступных вариантах загрузки трека.
   */
  'getDownloadInfo'(
    parameters?: Parameters<Paths.Tracks$TrackIdDownloadInfo.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDownloadInfo.Responses.$200>
  /**
   * getTrackSupplement - Получение дополнительной информации о треке (Текст песни, видео, и т.д.).
   * 
   * Получение дополнительной информации о треке (Текст песни, видео, и т.д.).
   */
  'getTrackSupplement'(
    parameters?: Parameters<Paths.Tracks$TrackIdSupplement.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTrackSupplement.Responses.$200>
  /**
   * getSimilarTracks - Получение похожих треков
   * 
   * Получение похожих треков
   */
  'getSimilarTracks'(
    parameters?: Parameters<Paths.Tracks$TrackIdSimilar.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSimilarTracks.Responses.$200>
  /**
   * getTrackLyrics - Получение текста песни с таймкодами
   */
  'getTrackLyrics'(
    parameters?: Parameters<Paths.Tracks$TrackIdLyrics.QueryParameters & Paths.Tracks$TrackIdLyrics.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTrackLyrics.Responses.$200>
  /**
   * playAudio - Метод для отправки текущего состояния прослушиваемого трека
   */
  'playAudio'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PlayAudio.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PlayAudio.Responses.$200>
  /**
   * getPopularTracks - Получение популярных треков для артиста
   */
  'getPopularTracks'(
    parameters?: Parameters<Paths.Artists$ArtistIdTrackIdsByRating.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPopularTracks.Responses.$200>
  /**
   * getArtistTracks
   */
  'getArtistTracks'(
    parameters?: Parameters<Paths.Artists$ArtistIdTracks.QueryParameters & Paths.Artists$ArtistIdTracks.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * getStationInfo - Получение информации о станции и пользовательских настроек на неё
   */
  'getStationInfo'(
    parameters?: Parameters<Paths.RotorStation$StationIdInfo.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStationInfo.Responses.$200>
  /**
   * getStationTracks - Получение цепочки треков определённой станции
   */
  'getStationTracks'(
    parameters?: Parameters<Paths.RotorStation$StationIdTracks.QueryParameters & Paths.RotorStation$StationIdTracks.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStationTracks.Responses.$200>
  /**
   * getStationsList - Получение всех радиостанций с настройками пользователя
   */
  'getStationsList'(
    parameters?: Parameters<Paths.RotorStationsList.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStationsList.Responses.$200>
  /**
   * getRotorStationsDashboard - Получение рекомендованных станций текущего пользователя
   */
  'getRotorStationsDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRotorStationsDashboard.Responses.$200>
  /**
   * sendStationFeedback - Отправка ответной реакции на происходящее при прослушивании радио. Сообщения о начале прослушивания радио, начале и конце трека, его пропуска.
   */
  'sendStationFeedback'(
    parameters?: Parameters<Paths.SendStationFeedback.QueryParameters & Paths.RotorStation$StationIdFeedback.PathParameters> | null,
    data?: Paths.SendStationFeedback.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SendStationFeedback.Responses.$200>
  /**
   * getBooksAndPodcasts - Получение блоков книг и подкастов с главной страницы
   */
  'getBooksAndPodcasts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBooksAndPodcasts.Responses.$200>
  /**
   * getQueues - Получение всех очередей треков с разных устройств для синхронизации между ними
   */
  'getQueues'(
    parameters?: Parameters<Paths.Queues.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetQueues.Responses.$200>
  /**
   * getQueueById - Получение очереди с треками по идентификатору
   */
  'getQueueById'(
    parameters?: Parameters<Paths.Queues$QueueId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetQueueById.Responses.$200>
  /**
   * updateQueuePosition - Установка текущего индекса проигрываемого трека в очереди треков
   */
  'updateQueuePosition'(
    parameters?: Parameters<Paths.Queues$QueueIdUpdatePosition.QueryParameters & Paths.Queues$QueueIdUpdatePosition.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateQueuePosition.Responses.$200>
}

export interface PathsDictionary {
  ['/token']: {
    /**
     * getToken - Получение токена по логину и паролю
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GetToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetToken.Responses.$200>
  }
  ['/settings']: {
    /**
     * getSettings
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSettings.Responses.$200>
  }
  ['/permission-alerts']: {
    /**
     * getPermissionAlerts
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPermissionAlerts.Responses.$200>
  }
  ['/account/experiments']: {
    /**
     * getAccountExperiments
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAccountExperiments.Responses.$200>
  }
  ['/account/consume-promo-code']: {
    /**
     * activatePromoCode
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ActivatePromoCode.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ActivatePromoCode.Responses.$200>
  }
  ['/feed/wizard/is-passed']: {
  }
  ['/account/settings']: {
    /**
     * getAccountSettings - Получение настроек текущего пользователя
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAccountSettings.Responses.$200>
    /**
     * changeAccountSettings - Изменение настроек текущего пользователя
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ChangeAccountSettings.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangeAccountSettings.Responses.$200>
  }
  ['/account/status']: {
    /**
     * getAccountStatus
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAccountStatus.Responses.$200>
  }
  ['/feed']: {
    /**
     * getFeed
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFeed.Responses.$200>
  }
  ['/tags/{tagId}/playlist-ids']: {
    /**
     * getPlaylistsIdsByTag
     */
    'get'(
      parameters?: Parameters<Paths.Tags$TagIdPlaylistIds.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPlaylistsIdsByTag.Responses.$200>
  }
  ['/albums/{albumId}/']: {
    /**
     * getAlbumById - Получение альбома по идентификатору
     */
    'get'(
      parameters?: Parameters<Paths.Albums$AlbumId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAlbumById.Responses.$200>
  }
  ['/albums/{albumId}/with-tracks']: {
    /**
     * getAlbumsWithTracks - Получение альбома с треками
     */
    'get'(
      parameters?: Parameters<Paths.Albums$AlbumIdWithTracks.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAlbumsWithTracks.Responses.$200>
  }
  ['/albums']: {
    /**
     * getAlbumsByIds - Получение альбомов по идентификаторам
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GetAlbumsByIds.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAlbumsByIds.Responses.$200>
  }
  ['/landing3']: {
    /**
     * getLandingBlocks
     */
    'get'(
      parameters?: Parameters<Paths.Landing3.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLandingBlocks.Responses.$200>
  }
  ['/landing3/{landingBlock}']: {
    /**
     * getLandingBlock
     */
    'get'(
      parameters?: Parameters<Paths.Landing3$LandingBlock.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLandingBlock.Responses.$200>
  }
  ['/landing3/new-releases']: {
    /**
     * getNewReleases
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNewReleases.Responses.$200>
  }
  ['/landing3/podcasts']: {
    /**
     * getNewPodcasts
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNewPodcasts.Responses.$200>
  }
  ['/landing3/new-playlists']: {
    /**
     * getNewPlaylists
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNewPlaylists.Responses.$200>
  }
  ['/landing3/chart/{chartType}']: {
    /**
     * getChart
     */
    'get'(
      parameters?: Parameters<Paths.Landing3Chart$ChartType.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetChart.Responses.$200>
  }
  ['/genres']: {
    /**
     * getGenres
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGenres.Responses.$200>
  }
  ['/playlists/list']: {
    /**
     * getPlaylistsByIds - Получение полной информации о плейлистах по их идентификатору
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GetPlaylistsByIds.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPlaylistsByIds.Responses.$200>
  }
  ['/users/{userId}/playlists/list']: {
    /**
     * getPlayLists - Получение списка плейлистов пользователя.
     */
    'get'(
      parameters?: Parameters<Paths.Users$UserIdPlaylistsList.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPlayLists.Responses.$200>
  }
  ['/users/{userId}/dislikes/tracks']: {
    /**
     * getDislikedTracksIds - Получение треков с отметкой "Не рекомендовать"
     */
    'get'(
      parameters?: Parameters<Paths.Users$UserIdDislikesTracks.QueryParameters & Paths.Users$UserIdDislikesTracks.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDislikedTracksIds.Responses.$200>
  }
  ['/search']: {
    /**
     * search - Осуществление поиска по запросу и типу, получение результатов
     */
    'get'(
      parameters?: Parameters<Paths.Search.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Search.Responses.$200>
  }
  ['/search/suggest']: {
  }
  ['/users/{userId}/playlists/{kind}']: {
    /**
     * getPlaylistById - Получение плейлиста по уникальному идентификатору
     */
    'get'(
      parameters?: Parameters<Paths.Users$UserIdPlaylists$Kind.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPlaylistById.Responses.$200>
  }
  ['/users/{userId}/playlists']: {
    /**
     * getUserPlaylistsByIds - Получение плейлистов по идентификаторам
     */
    'get'(
      parameters?: Parameters<Paths.Users$UserIdPlaylists.QueryParameters & Paths.Users$UserIdPlaylists.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserPlaylistsByIds.Responses.$200>
  }
  ['/users/{userId}/playlists/create']: {
    /**
     * createPlaylist - Создание нового плейлиста
     */
    'post'(
      parameters?: Parameters<Paths.Users$UserIdPlaylistsCreate.PathParameters> | null,
      data?: Paths.CreatePlaylist.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePlaylist.Responses.$200>
  }
  ['/users/{userId}/playlists/{kind}/name']: {
    /**
     * renamePlaylist - Изменение названия плейлиста.
     */
    'post'(
      parameters?: Parameters<Paths.Users$UserIdPlaylists$KindName.PathParameters> | null,
      data?: Paths.RenamePlaylist.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RenamePlaylist.Responses.$200>
  }
  ['/users/{userId}/playlists/{kind}/delete']: {
    /**
     * deletePlaylist - Удаление плейлиста
     */
    'post'(
      parameters?: Parameters<Paths.Users$UserIdPlaylists$KindDelete.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeletePlaylist.Responses.$200>
  }
  ['/users/{userId}/playlists/{kind}/change-relative']: {
    /**
     * changePlaylistTracks - Добавление треков в плейлист
     * 
     * Используй '{"diff":{"op":"insert","at":0,"tracks":[{"id":"20599729","albumId":"2347459"}]}}' - для добавления, {"diff":{"op":"delete","from":0,"to":1,"tracks":[{"id":"20599729","albumId":"2347459"}]}} - для удаления треков
     */
    'post'(
      parameters?: Parameters<Paths.Users$UserIdPlaylists$KindChangeRelative.PathParameters> | null,
      data?: Paths.ChangePlaylistTracks.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangePlaylistTracks.Responses.$200>
  }
  ['/users/{userId}/playlists/{kind}/recommendations']: {
    /**
     * getRecommendations - Получение рекомендаций для плейлиста
     */
    'get'(
      parameters?: Parameters<Paths.Users$UserIdPlaylists$KindRecommendations.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRecommendations.Responses.$200>
  }
  ['/users/{userId}/playlists/{kind}/visibility']: {
    /**
     * changePlaylistVisibility - Изменение видимости плейлиста
     * 
     * Необходимо передать "public" или "private" в качестве значения
     */
    'post'(
      parameters?: Parameters<Paths.Users$UserIdPlaylists$KindVisibility.PathParameters> | null,
      data?: Paths.ChangePlaylistVisibility.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangePlaylistVisibility.Responses.$200>
  }
  ['/users/{userId}/likes/tracks/add-multiple']: {
    /**
     * likeTracks - Пометить треки как "Мне нравится"
     */
    'post'(
      parameters?: Parameters<Paths.Users$UserIdLikesTracksAddMultiple.PathParameters> | null,
      data?: Paths.LikeTracks.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LikeTracks.Responses.$200>
  }
  ['/users/{userId}/likes/tracks/remove']: {
    /**
     * removeLikedTracks - Удаление треков из списка "Мне нравится"
     */
    'post'(
      parameters?: Parameters<Paths.Users$UserIdLikesTracksRemove.PathParameters> | null,
      data?: Paths.RemoveLikedTracks.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/users/{userId}/likes/tracks']: {
    /**
     * getLikedTracksIds - Получение треков с отметкой "Мне нравится"
     */
    'get'(
      parameters?: Parameters<Paths.Users$UserIdLikesTracks.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLikedTracksIds.Responses.$200>
  }
  ['/tracks/']: {
    /**
     * getTracks - Получение треков
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GetTracks.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTracks.Responses.$200>
  }
  ['/tracks/{trackId}/download-info']: {
    /**
     * getDownloadInfo - Получение информации о доступных вариантах загрузки трека.
     */
    'get'(
      parameters?: Parameters<Paths.Tracks$TrackIdDownloadInfo.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDownloadInfo.Responses.$200>
  }
  ['/tracks/{trackId}/supplement']: {
    /**
     * getTrackSupplement - Получение дополнительной информации о треке (Текст песни, видео, и т.д.).
     * 
     * Получение дополнительной информации о треке (Текст песни, видео, и т.д.).
     */
    'get'(
      parameters?: Parameters<Paths.Tracks$TrackIdSupplement.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTrackSupplement.Responses.$200>
  }
  ['/tracks/{trackId}/similar']: {
    /**
     * getSimilarTracks - Получение похожих треков
     * 
     * Получение похожих треков
     */
    'get'(
      parameters?: Parameters<Paths.Tracks$TrackIdSimilar.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSimilarTracks.Responses.$200>
  }
  ['/tracks/{trackId}/lyrics']: {
    /**
     * getTrackLyrics - Получение текста песни с таймкодами
     */
    'get'(
      parameters?: Parameters<Paths.Tracks$TrackIdLyrics.QueryParameters & Paths.Tracks$TrackIdLyrics.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTrackLyrics.Responses.$200>
  }
  ['/play-audio']: {
    /**
     * playAudio - Метод для отправки текущего состояния прослушиваемого трека
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PlayAudio.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PlayAudio.Responses.$200>
  }
  ['/artists/{artistId}/track-ids-by-rating']: {
    /**
     * getPopularTracks - Получение популярных треков для артиста
     */
    'get'(
      parameters?: Parameters<Paths.Artists$ArtistIdTrackIdsByRating.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPopularTracks.Responses.$200>
  }
  ['/artists/{artistId}/brief-info']: {
  }
  ['/artists/{artistId}/tracks']: {
    /**
     * getArtistTracks
     */
    'get'(
      parameters?: Parameters<Paths.Artists$ArtistIdTracks.QueryParameters & Paths.Artists$ArtistIdTracks.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/artists/{artistId}/direct-albums']: {
  }
  ['/rotor/station/{stationId}/info']: {
    /**
     * getStationInfo - Получение информации о станции и пользовательских настроек на неё
     */
    'get'(
      parameters?: Parameters<Paths.RotorStation$StationIdInfo.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStationInfo.Responses.$200>
  }
  ['/rotor/station/{stationId}/tracks']: {
    /**
     * getStationTracks - Получение цепочки треков определённой станции
     */
    'get'(
      parameters?: Parameters<Paths.RotorStation$StationIdTracks.QueryParameters & Paths.RotorStation$StationIdTracks.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStationTracks.Responses.$200>
  }
  ['/rotor/account/status']: {
  }
  ['/rotor/stations/list']: {
    /**
     * getStationsList - Получение всех радиостанций с настройками пользователя
     */
    'get'(
      parameters?: Parameters<Paths.RotorStationsList.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStationsList.Responses.$200>
  }
  ['/rotor/stations/dashboard']: {
    /**
     * getRotorStationsDashboard - Получение рекомендованных станций текущего пользователя
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRotorStationsDashboard.Responses.$200>
  }
  ['/rotor/station/{stationId}/feedback']: {
    /**
     * sendStationFeedback - Отправка ответной реакции на происходящее при прослушивании радио. Сообщения о начале прослушивания радио, начале и конце трека, его пропуска.
     */
    'post'(
      parameters?: Parameters<Paths.SendStationFeedback.QueryParameters & Paths.RotorStation$StationIdFeedback.PathParameters> | null,
      data?: Paths.SendStationFeedback.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SendStationFeedback.Responses.$200>
  }
  ['/non-music/calague']: {
    /**
     * getBooksAndPodcasts - Получение блоков книг и подкастов с главной страницы
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBooksAndPodcasts.Responses.$200>
  }
  ['/queues']: {
    /**
     * getQueues - Получение всех очередей треков с разных устройств для синхронизации между ними
     */
    'get'(
      parameters?: Parameters<Paths.Queues.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetQueues.Responses.$200>
  }
  ['/queues/{queueId}']: {
    /**
     * getQueueById - Получение очереди с треками по идентификатору
     */
    'get'(
      parameters?: Parameters<Paths.Queues$QueueId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetQueueById.Responses.$200>
  }
  ['/queues/{queueId}/update-position']: {
    /**
     * updateQueuePosition - Установка текущего индекса проигрываемого трека в очереди треков
     */
    'post'(
      parameters?: Parameters<Paths.Queues$QueueIdUpdatePosition.QueryParameters & Paths.Queues$QueueIdUpdatePosition.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateQueuePosition.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
